import LocaleService from '@i18n/locale/LocaleService';
import frMessages from '@i18n/translations/fr';
import { Translations } from '@i18n/translations/Translations';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import { observable, WritableObservable } from 'micro-observables';
import { HttpError } from 'simple-http-rest-client';

export default class MessageService {
  private messages: WritableObservable<Translations>;

  private static translations: Map<Locale, Translations> = new Map<Locale, Translations>([
    [LocaleService.LOCALE_FR, frMessages],
  ]);

  constructor(localeService: LocaleService) {
    this.messages = observable(MessageService.fetchMessages(localeService.getCurrentLocale().get()));
    localeService
      .getCurrentLocale()
      .subscribe((locale: Locale) => this.updateMessagesWithLocale(locale));
  }

  private updateMessagesWithLocale(locale: Locale) {
    this.messages.set(MessageService.fetchMessages(locale));
  }

  private static fetchMessages(locale: Locale) {
    return MessageService.translations.get(locale) ?? frMessages;
  }

  /**
   * Try to compute the corresponding error message and return the right translation.
   * If no message could be found, the error code is returned
   */
  static httpError(messages: Translations, error: HttpError): string {
    const translatedArguments: string[] = (error.statusArguments ?? []).map((argument: string) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const translation: string | Function = (messages as any)[argument];
      if (translation && typeof translation === 'string') {
        return translation;
      }
      return argument;
    });
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const translatedMessage: string | Function = (messages['http-errors'] as any)[error.errorCode];
    if (translatedMessage) {
      if (typeof translatedMessage === 'function') {
        return translatedMessage(...translatedArguments);
      }
      return translatedMessage;
    }
    return error.errorCode;
  }

  /**
   * Return the messages observable for the current locale
   */
  getMessages() {
    return this.messages.readOnly();
  }
}
