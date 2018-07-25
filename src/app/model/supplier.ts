import { DatabaseEntity } from './database-entity';

/**
 * A supplier.
 *
 * @author Nils Weber
 */
export class Supplier extends DatabaseEntity {

  /** The supplier's name. */
  public name: string;

  /** The supplier's street. */
  public street: string;

  /** The supplier's postal code or zip. */
  public postalCode: string;

  /** The supplier's city. */
  public city: string;

  /** The supplier's telephone number. */
  public telephone: string;

  /** The supplier's mobile phone number. */
  public mobile: string;

  /** The supplier's fax number. */
  public fax: string;

  /** The supplier's email address. */
  public email: string;

}
