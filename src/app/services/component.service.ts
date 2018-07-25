import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Component } from 'src/app/model/component';
import { ResponseMessage } from 'src/app/model/response-message';

/**
 * Service to handle CRUD operations for components.
 *
 * @author Matrin Wünsch
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  /** The URL to the corresponding REST route. */
  private url = '/api/components';


  constructor(private httpClient: HttpClient) { }


  /**
   * Returns all components from the server.
   *
   * @author Matrin Wünsch
   */
  getComponents(): Observable<Component[]> {
    return this.httpClient.get<Component[]>(this.url);
  }


  /**
   * Returns the component with the given id from the server.
   *
   * @param id The component's id.
   *
   * @author Martin Wünsch
   */
  getComponentById(id: number): Observable<Component> {
    return this.httpClient.get<Component>(this.url + '/' + id);
  }


  /**
   * Creates a new component on the server.
   *
   * @param attribute The attribute to create.
   *
   * @author Martin Wünsch
   */
  createComponent(component: Component): Observable<ResponseMessage> {
    let x = this.httpClient.post<Component>(this.url, component).subscribe(res => {
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


  /**
   * Updates the given component on the server.
   *
   * @param component The component to update.
   *
   * @author Martin Wünsch
   */
  updateComponent(component: Component): Observable<ResponseMessage> {
    let x = this.httpClient.put<Component>(this.url + '/' + component.id, component).subscribe(res => {
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


  /**
   * Deletes the given component from the server.
   *
   * @param component The component to delete.
   *
   * @author Martin Wünsch
   */
  deleteComponent(component: Component): Observable<ResponseMessage> {
    this.httpClient.delete(this.url + '/' + component.id).subscribe(res => {
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
