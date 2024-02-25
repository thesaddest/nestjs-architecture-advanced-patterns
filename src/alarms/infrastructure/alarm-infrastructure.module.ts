import { OrmAlarmPersistenceModule } from './persistence/orm/orm-persistence.module';
import { InMemoryAlarmPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmAlarmPersistenceModule
        : InMemoryAlarmPersistenceModule;

    return {
      module: AlarmInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
