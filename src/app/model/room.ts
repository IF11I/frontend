import { DatabaseEntity } from './database-entity';

/**
 * A room.
 *
 * @author Nils Weber
 */
export class Room extends DatabaseEntity {

  /** The room's name. */
  public name = '';

  /** The room's number. */
  public number = '';

  /** Notes to this room.  */
  public notes = '';

}
