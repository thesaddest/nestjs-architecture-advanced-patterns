import { Injectable } from '@nestjs/common';
import { CreateAlarmRepository } from '../../../../application/ports/create-alarm.repository';
import { AlarmEntity } from '../alarm/alarm.entity';
import { Alarm } from '../../../../domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { FindAlarmRepository } from '../../../../application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '../../../../application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  public readonly materializedAlarmViews = new Map<string, AlarmReadModel>();
  constructor() {}

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
