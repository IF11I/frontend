import { DatabaseEntity } from './database-entity';

/**
 * A supplier.
 *
 * @author Nils Weber
 */
export class Supplier extends DatabaseEntity {

  /** The supplier's name. */
  public name = '';

  /** The supplier's street. */
  public street = '';

  /** The supplier's postal code or zip. */
  public postalCode = '';

  /** The supplier's city. */
  public city = '';

  /** The supplier's telephone number. */
  public telephone = '';

  /** The supplier's mobile phone number. */
  public mobile = '';

  /** The supplier's fax number. */
  public fax = '';

  /** The supplier's email address. */
  public email = '';

}
