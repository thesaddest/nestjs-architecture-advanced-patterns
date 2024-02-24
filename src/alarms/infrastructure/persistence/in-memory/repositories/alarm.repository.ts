import { Inject, Injectable } from '@nestjs/common';
import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmEntity } from '../alarm/alarm.entity';
import { Repository } from 'typeorm';
import { Alarm } from '../../../../domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();
  constructor() {}

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return entities.map((e) => AlarmMapper.toDomain(e));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
