import { DatabaseEntity } from './database-entity';

/**
 * A room.
 *
 * @author Nils Weber
 */
export class Room extends DatabaseEntity {

  /** The room's name. */
  public name: string;

  /** The room's number. */
  public number: string;

  /** Notes to this room.  */
  public notes: string;

}
