export class DatabaseEntity {
  public get isInDatabase(): boolean { return !!this.id; }

  constructor(public readonly id?: number) { }
}
