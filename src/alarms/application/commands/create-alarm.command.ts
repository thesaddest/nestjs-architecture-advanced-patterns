export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    public readonly items: Array<{ name: string; type: string }>,
    public readonly triggeredAt: Date,
  ) {}
}
