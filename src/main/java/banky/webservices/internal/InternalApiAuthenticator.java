package banky.webservices.internal;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import banky.services.configuration.ConfigurationService;

import com.coreoz.plume.jersey.security.basic.BasicAuthenticator;

@Singleton
public class InternalApiAuthenticator {
    private final BasicAuthenticator<String> basicAuthenticator;

    @Inject
    public InternalApiAuthenticator(ConfigurationService configurationService) {
        this.basicAuthenticator = BasicAuthenticator.fromSingleCredentials(
            configurationService.internalApiAuthUsername(),
            configurationService.internalApiAuthPassword(),
            "API banky"
        );
    }

    public BasicAuthenticator<String> get() {
        return this.basicAuthenticator;
    }
}
