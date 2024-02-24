import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../application/ports/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';

@Module({
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryAlarmPersistenceModule {}
