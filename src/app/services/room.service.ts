import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Room } from '../model/room';
import { ResponseMessage } from '../model/response-message';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private fakeRooms: Room[] = [
    { id: 1, name: 'Room 1', number: 'r001', notes: '' },
    { id: 2, name: 'Room 2', number: 'r002', notes: '' },
    { id: 3, name: 'Room 3', number: 'r003', notes: '' },
  ];

  constructor(private httpClient: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return of(this.fakeRooms);
  }

  getRoomById(id: number): Observable<Room> {
    return of(this.fakeRooms.find(room => room.id === id));
  }

  createRoom(room: Room): Observable<ResponseMessage> {
    room.id = this.fakeRooms.length;
    this.fakeRooms.push(room);
    return of({ isSuccessful: true, messageText: 'Room created' });
  }

  updateRoom(room: Room): Observable<ResponseMessage> {
    const roomIndex = this.fakeRooms.findIndex(_room => _room.id === room.id);
    this.fakeRooms[roomIndex] = room;
    return of({ isSuccessful: true, messageText: 'Room updated' });
  }

  deleteRoomById(id: number): Observable<ResponseMessage> {
    const roomIndex = this.fakeRooms.findIndex(room => room.id === id);
    this.fakeRooms.splice(roomIndex, 1);
    return of({ isSuccessful: true, messageText: 'Room deleted' });
  }

  deleteRoom(room: Room): Observable<ResponseMessage> {
    return this.deleteRoomById(room.id);
  }
}
