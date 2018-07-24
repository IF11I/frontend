import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Room } from '../model/room';
import { ResponseMessage } from '../model/response-message';
import { catchError } from '../../../node_modules/rxjs/operators';
import { log, debug } from 'util';
import { logging } from '../../../node_modules/protractor';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url: "/api/rooms";

  private fakeRooms: Room[] = [
    { id: 1, name: 'Room 1', number: 'r001', notes: '' },
    { id: 2, name: 'Room 2', number: 'r002', notes: '' },
    { id: 3, name: 'Room 3', number: 'r003', notes: '' },
  ];

  constructor(private httpClient: HttpClient) { }

  // returns all the rooms from the server
  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>("/api/rooms");
  }

  // returns the room with a given Id from the server
  getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>("/api/rooms/" + id);
  }

  // creates a room on server 
  createRoom(room: Room): Observable<ResponseMessage> {

    var x = this.httpClient.post<Room>("/api/rooms", room).subscribe(res => {
      console.log(res);
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });
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
