import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { FindAlarmRepository } from '../../../application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';

@Module({
  providers: [
    InMemoryAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryAlarmPersistenceModule {}
