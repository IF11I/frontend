import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
    return this.httpClient.post<ResponseMessage>(this.url, component);
  }


  /**
   * Updates the given component on the server.
   *
   * @param component The component to update.
   *
   * @author Martin Wünsch
   */
  updateComponent(component: Component): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.url + '/' + component.id, component);
  }


  /**
   * Deletes the given component from the server.
   *
   * @param component The component to delete.
   *
   * @author Martin Wünsch
   */
  deleteComponent(component: Component): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(this.url + '/' + component.id);
  }

}
