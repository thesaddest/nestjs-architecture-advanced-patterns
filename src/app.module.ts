import { Module } from '@nestjs/common';
import { AlarmsModule } from './alarms/application/alarms.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { AlarmInfrastructureModule } from './alarms/infrastructure/alarm-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInInfrastructure(
          AlarmInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
