import { DatabaseEntity } from './database-entity';

/**
 * A attribute that is linked to a component type.
 *
 * @author Nils Weber
 */
export class Attribute extends DatabaseEntity {

  /** The attribute's label. */
  public label: string;

  /** The attribute's value. */
  public value?: string;

}
