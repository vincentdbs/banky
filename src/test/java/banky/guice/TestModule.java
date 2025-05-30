package banky.guice;

import com.coreoz.plume.db.guice.GuiceDbTestModule;
import com.coreoz.plume.mocks.MockedClock;
import com.google.inject.AbstractModule;
import com.google.inject.util.Modules;

import java.time.Clock;

/**
 * The Guice module that will be used for integration tests.
 * <p>
 * In this module, it is possible to override the behaviors of some services as it is shown with the {@link TimeProvider}
 * module.
 */
public class TestModule extends AbstractModule {
    @Override
    protected void configure() {
        install(Modules.override(new ApplicationModule()).with(new AbstractModule() {
            @Override
            protected void configure() {
                bind(Clock.class).to(MockedClock.class);
            }
        }));
        install(new GuiceDbTestModule());
    }
}
