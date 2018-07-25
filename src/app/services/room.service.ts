import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Room } from '../model/room';
import { ResponseMessage } from '../model/response-message';

@Injectable({
  providedIn: 'root'
})
// The room.service handles the communication with the backend, regarding rooms.
export class RoomService {

  private url = "/api/rooms";
  constructor(private httpClient: HttpClient) { }

  // returns all the rooms from the server
  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.url);
  }

  // returns the room with a given Id from the server
  getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.url + "/" + id);
  }

  // creates a room on server 
  createRoom(room: Room): Observable<ResponseMessage> {
    var x = this.httpClient.post<Room>(this.url, room).subscribe(res => {
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

  // updates room on the server
  updateRoom(room: Room): Observable<ResponseMessage> {
    var x = this.httpClient.put<Room>(this.url + "/" + room.id, room).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Raum konnte nicht upgedated werden' });
      });
    return of({ isSuccessful: true, messageText: 'Room updated' });
  }

  // deletes a room on the server
  deleteRoom(room: Room): Observable<ResponseMessage> {
    this.httpClient.delete(this.url + "/" + room.id).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Raum konnte nicht gelöscht werden' });
      });
    return of({ isSuccessful: true, messageText: 'Room deleted' });
  }
}
