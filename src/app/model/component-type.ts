import { DatabaseEntity } from './database-entity';
import { Attribute } from './attribute';

/**
 * A component type.
 *
 * @author Nils Weber
 */
export class ComponentType extends DatabaseEntity {

  /** The component type's name. */
  public name: string;

  /** The attributes linked to this component type. */
  public attributes: Attribute[] = [];

}
