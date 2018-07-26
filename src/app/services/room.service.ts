import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
    return this.httpClient.post<ResponseMessage>(this.url, room);
  }


  /**
   * Updates the given room on the server.
   *
   * @param room The room to update.
   *
   * @author Martin Wünsch
   */
  updateRoom(room: Room): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.url + '/' + room.id, room);
  }


  /**
   * Deletes the given room from the server.
   *
   * @param room The room to delete.
   *
   * @author Martin Wünsch
   */
  deleteRoom(room: Room): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(this.url + '/' + room.id);
  }

}
