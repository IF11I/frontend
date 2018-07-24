import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ComponentType } from 'src/app/model/component-type';
import { ResponseMessage } from 'src/app/model/response-message';

@Injectable({
  providedIn: 'root'
})
export class ComponentTypeService {

  private fakeTypes: ComponentType[] = [
    { id: 1, name: 'Type1', attributes: [ { label: 'Attr1' } ] },
    { id: 2, name: 'Type2', attributes: [ { label: 'Attr2' } ] },
  ];

  constructor() { }

  getTypes(): Observable<ComponentType[]> {
    return of(this.fakeTypes);
  }

  getTypeById(id: number): Observable<ComponentType> {
    return of(this.fakeTypes.find(type => type.id === id));
  }

  createType(componentType: ComponentType): Observable<ResponseMessage> {
    // room.id = this.fakeRooms.length + 1;
    this.fakeTypes.push(componentType);
    return of({ isSuccessful: true, messageText: 'ComponentType created' });
  }

  updateType(componentType: ComponentType): Observable<ResponseMessage> {
    const typeIndex = this.fakeTypes.findIndex(_componentType => _componentType.id === componentType.id);
    this.fakeTypes[typeIndex] = componentType;
    return of({ isSuccessful: true, messageText: 'ComponentType updated' });
  }

  deleteTypeById(id: number): Observable<ResponseMessage> {
    const typeIndex = this.fakeTypes.findIndex(room => room.id === id);
    this.fakeTypes.splice(typeIndex, 1);
    return of({ isSuccessful: true, messageText: 'ComponentType deleted' });
  }

  deleteType(componentType: ComponentType): Observable<ResponseMessage> {
    return this.deleteTypeById(componentType.id);
  }
}
