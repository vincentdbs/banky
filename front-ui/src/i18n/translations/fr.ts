import {
  TransactionFields,
} from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';
import { TransactionSide } from '@/api/transactions/TransactionsTypes';
import { Translations } from './Translations';

const frMessages: Translations = {
  title: 'Banky',
  form: {
    validation: {
      invalid_date: 'La date est invalide',
      positive_amount: 'Le montant doit être un nombre positif',
      required_field: 'Le champ est requis',
    },
  },
  common: {
    treasury: 'Trésorerie',
    incomes: 'Revenus',
    expenses: 'Dépenses',
    savings: 'Épargnes',
    accounts: 'Comptes',
  },
  // actions
  action: {
    edit: 'Modifier',
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    search: 'Rechercher',
    add: 'Ajouter',
    authenticate: 'Me connecter',
    disconnect: 'Me déconnecter',
    keep_editing: 'Rester sur la page',
    close_without_saving: 'Fermer sans sauvegarder',
  },
  // common labels
  label: {
    creation_date: 'Date de création',
    loading: 'Chargement...',
  },
  // common messages
  message: {
    changes_saved: 'Les modifications ont bien été enregistrées',
    unsaved_data: 'Des modifications n\'ont pas été enregistrées. '
      + 'Si vous voulez enregistrer ces modifications, cliquez sur le bouton "Rester sur la page"',
    confirm_delete: 'Pour confirmer la suppression, cliquez sur le bouton "Supprimer"',
    side: {
      [TransactionSide.DEBIT]: 'Dépense',
      [TransactionSide.CREDIT]: 'Gain',
    },
  },
  // errors
  error: {
    unknownChoice: 'Choix inconnu',
    field: {
      required: 'Le champ est requis',
      email_wrong_format: 'L\'adresse e-mail saisie semble être incorrecte',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'Une erreur inattendue s\'est produite',
    NETWORK_ERROR: 'Erreur réseau, votre connexion internet semble indisponible',
    TIMEOUT_ERROR: 'Erreur réseau (timeout), votre connexion internet ou le serveur distant semble indisponible',
    FORBIDDEN_ERROR: 'Il semble que vous n\'avez pas accès à cette ressource ou à cette action',
    WRONG_LOGIN_OR_PASSWORD: 'Nom d\'utilisateur ou mot de passe incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Suite à des erreurs dans la saisie de vos identifiants, votre compte est verrouillé pendant ${seconds} secondes, veuillez-vous reconnecter ultérieurement`,
    FIELD_REQUIRED: (fieldName: string) => `Le champ '${fieldName}' est requis`,
    MESSAGE: (message: string) => message,
  },
  sidebar: {
    dashboard: {
      title: 'Dashboard',
    },
    parameters: {
      title: 'Paramètres',
      accounts: 'Comptes',
      categories: 'Catégories',
      subCategories: 'Sous-catégories',
    },
    operations: {
      title: 'Opérations',
      transactions: 'Transactions',
      orders: 'Ordres',
      transfert: 'Transfert',
    },
    evolution: {
      treasury: 'Trésorerie',
      graph: 'Graphiques',
    },
  },
  parameters: {
    accounts: {
      title: 'Comptes',
      subTitle: 'Configuration des comptes',
    },
    categories: {
      title: 'Categories',
      subTitle: 'Configuration des catégories',
      table: {
        name: 'Nom',
        action: 'Action',
      },
    },
    subCategories: {
      title: 'Sous-catégories',
      subTitle: 'Configuration des sous-catégories',
      table: {
        name: 'Nom',
        categoryName: 'Nom de la catégorie',
        action: 'Action',
      },
    },
  },
  operations: {
    transactions: {
      title: 'Transactions',
      subTitle: 'Liste des transactions',
      table: {
        date: 'Date',
        amount: 'Montant',
        accountName: 'Compte',
        subCategoryName: 'Sous-catégorie',
        comment: 'Commentaire',
        tag: 'Tag',
        fromToPersonName: 'De/À',
        action: 'Action',
      },
      form: {
        title: 'Transaction',
        description: 'Ajout d\'une transaction',
        fields: {
          from: 'De',
          to: 'Vers',
          [TransactionFields.DATE]: 'Le',
          [TransactionFields.IN_BANK_DATE]: 'Réconcilié le',
          [TransactionFields.AMOUNT]: 'Montant',
          [TransactionFields.ACCOUNT]: 'Compte',
          [TransactionFields.SIDE]: 'Débit/Crédit',
          [TransactionFields.SUBCATEGORY]: 'Sous-catégorie',
          [TransactionFields.FROM_TO_PERSON]: 'De/À',
          [TransactionFields.COMMENT]: 'Commentaire',
          [TransactionFields.TAG]: 'Tag',
        },
      },
    },
  },
  dashboard: {
    cards: {
      fromLastMonth: 'depuis le mois dernier',
    }
  }
} as const;

export default frMessages;
