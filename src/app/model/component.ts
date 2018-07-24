import { DatabaseEntity } from './database-entity';
import { Attribute } from './attribute';

export class Component extends DatabaseEntity {
  public roomId: number;
  public supplierId: number;
  public datePurchased: Date;
  public dateWarrantyEnd: Date;
  public notes: string;
  public manufacturer: string;
  public componentTypeId: number;
  public attributes: Attribute[];
}
