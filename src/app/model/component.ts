import { Attribute } from './attribute';

export interface Component {
  id?: number;
  roomId: number;
  supplierId: number;
  datePurchased: Date;
  dateWarrentyEnd: Date;
  notes: string;
  manufacturer: string;
  componentTypeId: number;
  attributes: Attribute[];
}
