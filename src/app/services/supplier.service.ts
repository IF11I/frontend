import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ResponseMessage } from '../model/response-message';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private url = '/api/suppliers';


  constructor(private httpClient: HttpClient) { }


  getSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.url);
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.httpClient.get<Supplier>(this.url + '/' + id);
  }

  createSupplier(supplier: Supplier): Observable<ResponseMessage> {
    this.httpClient.post(this.url, supplier);
    return of({ isSuccessful: true, messageText: 'Room created' });
  }

  // updateRoom(room: Room): Observable<ResponseMessage> {
  //   const roomIndex = this.fakeRooms.findIndex(_room => _room.id === room.id);
  //   this.fakeRooms[roomIndex] = room;
  //   return of({ isSuccessful: true, messageText: 'Room updated' });
  // }

  // deleteRoomById(id: number): Observable<ResponseMessage> {
  //   const roomIndex = this.fakeRooms.findIndex(room => room.id === id);
  //   this.fakeRooms.splice(roomIndex, 1);
  //   return of({ isSuccessful: true, messageText: 'Room deleted' });
  // }

  // deleteRoom(room: Room): Observable<ResponseMessage> {
  //   return this.deleteRoomById(room.id);
  // }
}
