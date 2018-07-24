import { DatabaseEntity } from './database-entity';

export class Room extends DatabaseEntity {
  public name: string;
  public number: string;
  public notes: string;
}
