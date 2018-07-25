import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Room } from '../model/room';
import { ResponseMessage } from '../model/response-message';

/**
 * Service to handle CRUD operations for rooms.
 *
 * @author Matrin Wünsch
 */
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  /** The URL to the corresponding REST route. */
  private url = '/api/rooms';


  constructor(private httpClient: HttpClient) { }


  /**
   * Returns all rooms from the server.
   *
   * @author Matrin Wünsch
   */
  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.url);
  }


  /**
   * Returns the room with the given id from the server.
   *
   * @param id The room's id.
   *
   * @author Martin Wünsch
   */
  getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.url + '/' + id);
  }


  /**
   * Creates a new room on the server.
   *
   * @param room The room to create.
   *
   * @author Martin Wünsch
   */
  createRoom(room: Room): Observable<ResponseMessage> {
    let x = this.httpClient.post<Room>(this.url, room).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Raum konnte nicht angelegt werden' });
      });

    return of({ isSuccessful: true, messageText: 'Room created' });
  }


  /**
   * Updates the given room on the server.
   *
   * @param room The room to update.
   *
   * @author Martin Wünsch
   */
  updateRoom(room: Room): Observable<ResponseMessage> {
    let x = this.httpClient.put<Room>(this.url + '/' + room.id, room).subscribe(res => {
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


  /**
   * Deletes the given room from the server.
   *
   * @param room The room to delete.
   *
   * @author Martin Wünsch
   */
  deleteRoom(room: Room): Observable<ResponseMessage> {
    this.httpClient.delete(this.url + '/' + room.id).subscribe(res => {
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
