export class CreateAlarmDto {
  name: string;
  severity: string;
  items: Array<{ name: string; type: string }>;
  triggeredAt: Date;
}
