import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Attribute } from 'src/app/model/attribute';
import { ResponseMessage } from 'src/app/model/response-message';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private fakeTypes: Attribute[] = [
    { id: 1, label: 'Attr1' },
    { id: 2, label: 'Attr2' },
  ];

  constructor() { }

  getAttributes(): Observable<Attribute[]> {
    return of(this.fakeTypes);
  }

  getAttributeById(id: number): Observable<Attribute> {
    return of(this.fakeTypes.find(type => type.id === id));
  }

  createAttribute(componentType: Attribute): Observable<ResponseMessage> {
    // room.id = this.fakeRooms.length + 1;
    this.fakeTypes.push(componentType);
    return of({ isSuccessful: true, messageText: 'ComponentType created' });
  }

  updateAttribute(componentType: Attribute): Observable<ResponseMessage> {
    const typeIndex = this.fakeTypes.findIndex(_componentType => _componentType.id === componentType.id);
    this.fakeTypes[typeIndex] = componentType;
    return of({ isSuccessful: true, messageText: 'ComponentType updated' });
  }

  deleteAttributeById(id: number): Observable<ResponseMessage> {
    const typeIndex = this.fakeTypes.findIndex(room => room.id === id);
    this.fakeTypes.splice(typeIndex, 1);
    return of({ isSuccessful: true, messageText: 'ComponentType deleted' });
  }

  deleteAttribute(componentType: Attribute): Observable<ResponseMessage> {
    return this.deleteAttributeById(componentType.id);
  }
}
