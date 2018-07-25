import { DatabaseEntity } from './database-entity';
import { Attribute } from './attribute';

/**
 * A component (not to be confused with Angular's `Component` class).
 *
 * @author Nils Weber
 */
export class Component extends DatabaseEntity {

  /** The component's name. */
  public name: string;

  /** The id of the room in which this component resides. */
  public roomId: number;

  /** The id of the supplier who supplied this component. */
  public supplierId: number;

  /** The date of purchase. */
  public datePurchased: Date;

  /** The date the component's warranty ends. */
  public dateWarrantyEnd: Date;

  /** Notes to this component. */
  public notes: string;

  /** The component's manufacturer. */
  public manufacturer: string;

  /** The id of this component's component type. */
  public componentTypeId: number;

  /** The list of attributes this component has. */
  public attributes: Attribute[];

}
