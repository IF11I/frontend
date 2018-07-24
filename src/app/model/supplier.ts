import { DatabaseEntity } from './database-entity';

export class Supplier extends DatabaseEntity {
  public name: string;
  public street: string;
  public postalCode: string;
  public city: string;
  public telephone: string;
  public mobile: string;
  public fax: string;
  public email: string;
}
