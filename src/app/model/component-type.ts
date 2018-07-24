import { DatabaseEntity } from './database-entity';
import { Attribute } from './attribute';

export class ComponentType extends DatabaseEntity {
  public name: string;
  public attributes: Attribute[];
}
