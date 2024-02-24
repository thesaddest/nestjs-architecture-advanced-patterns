import { Injectable } from '@nestjs/common';
import { FindAlarmRepository } from '../../../../application/ports/find-alarms.repository';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';
import { InjectModel } from '@nestjs/mongoose';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return await this.alarmModel.find();
  }
}
