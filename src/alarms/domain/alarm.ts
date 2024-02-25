import { AlarmSeverity } from './value-objects/alarm-severity';
import { AlarmItem } from './alarm-item';
import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';

export class Alarm extends VersionedAggregateRoot {
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();
  public name: string;
  public severity: AlarmSeverity;

  constructor(public id: string) {
    super();
  }

  acknowledge() {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }
}
