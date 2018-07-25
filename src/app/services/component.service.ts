import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Component } from '../model/component';
import { ResponseMessage } from '../model/response-message';

@Injectable({
  providedIn: 'root'
})
// The component.service handles the communication with the backend, regarding rooms.
export class ComponentService {

  private url = "/api/components";
  constructor(private httpClient: HttpClient) { }

  // returns all the Components from the server
  getComponent(): Observable<Component[]> {
    return this.httpClient.get<Component[]>(this.url);
  }

  // returns the Component with a given Id from the server
  getComponentById(id: number): Observable<Component> {
    return this.httpClient.get<Component>(this.url + "/" + id);
  }

  // creates a Component on server 
  createComponent(component: Component): Observable<ResponseMessage> {
    var x = this.httpClient.post<Component>(this.url, component).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Komponente konnte nicht angelegt werden' });
      });

    return of({ isSuccessful: true, messageText: 'Komponente created' });
  }

  // updates Component on the server
  updateComponent(component: Component): Observable<ResponseMessage> {
    var x = this.httpClient.put<Component>(this.url + "/" + component.id, component).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Komponente konnte nicht upgedated werden' });
      });
    return of({ isSuccessful: true, messageText: 'Komponente updated' });
  }

  // deletes a Component on the server
  deleteComponent(component: Component): Observable<ResponseMessage> {
    this.httpClient.delete(this.url + "/" + component.id).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Komponente konnte nicht gelöscht werden' });
      });
    return of({ isSuccessful: true, messageText: 'Komponente deleted' });
  }
}
