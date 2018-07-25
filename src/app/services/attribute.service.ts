import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Attribute } from 'src/app/model/attribute';
import { ResponseMessage } from 'src/app/model/response-message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AttributeService {
// The attributes.service handles the communication with the backend, regarding rooms.

  private url = "/api/attributes";
  constructor(private httpClient: HttpClient) { }

  // returns all the attribute from the server
  getAttributes(): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(this.url);
  }

  // returns the attribute with a given Id from the server
  getAttributeById(id: number): Observable<Attribute> {
    return this.httpClient.get<Attribute>(this.url + "/" + id);
  }

  // creates a attribute on server 
  createAttribute(attribute: Attribute): Observable<ResponseMessage> {
    var x = this.httpClient.post<Attribute>(this.url, attribute).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Attribut konnte nicht angelegt werden' });
      });

    return of({ isSuccessful: true, messageText: 'Room created' });
  }

  // updates attributes on the server
  updateAttribute(attribute: Attribute): Observable<ResponseMessage> {
    var x = this.httpClient.put<Attribute>(this.url + "/" + attribute.id, attribute).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Attribut konnte nicht upgedated werden' });
      });
    return of({ isSuccessful: true, messageText: 'attribute updated' });
  }

  // deletes a attributes on the server
  deleteAttribute(attribute: Attribute): Observable<ResponseMessage> {
    this.httpClient.delete(this.url + "/" + attribute.id).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Attribut konnte nicht gelöscht werden' });
      });
    return of({ isSuccessful: true, messageText: 'attribute deleted' });
  }
}
