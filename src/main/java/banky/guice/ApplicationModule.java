package banky.guice;

import com.coreoz.plume.db.guice.DataSourceModule;
import com.coreoz.plume.db.querydsl.guice.GuiceQuerydslModule;
import org.glassfish.jersey.server.ResourceConfig;

import banky.jersey.JerseyConfigProvider;

import com.coreoz.plume.conf.guice.GuiceConfModule;
import com.coreoz.plume.jersey.monitoring.guice.GuiceJacksonWithMetricsModule;
import com.google.inject.AbstractModule;

/**
 * Group the Guice modules to install in the application
 */
public class ApplicationModule extends AbstractModule {

    @Override
    protected void configure() {
        install(new GuiceConfModule());
        install(new GuiceJacksonWithMetricsModule());
        install(new GuiceQuerydslModule());
        install(new DataSourceModule());

        // Prepare Jersey configuration
        bind(ResourceConfig.class).toProvider(JerseyConfigProvider.class);
    }

}
