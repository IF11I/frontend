import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ComponentType } from 'src/app/model/component-type';
import { ResponseMessage } from 'src/app/model/response-message';
import { HttpClient } from '@angular/common/http';

/**
 * Service to handle CRUD operations for component types.
 *
 * @author Matrin Wünsch
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentTypeService {

  /** The URL to the corresponding REST route. */
  private url = '/api/componenttypes';


  constructor(private httpClient: HttpClient) { }


  /**
   * Returns all component types from the server.
   *
   * @author Matrin Wünsch
   */
  getComponentTypes(): Observable<ComponentType[]> {
    return this.httpClient.get<ComponentType[]>(this.url);
  }


  /**
   * Returns the component type with the given id from the server.
   *
   * @param id The component type's id.
   *
   * @author Martin Wünsch
   */
  getComponentTypeById(id: number): Observable<ComponentType> {
    return this.httpClient.get<ComponentType>(this.url + '/' + id);
  }


  /**
   * Creates a new component type on the server.
   *
   * @param componentType The component type to update.
   *
   * @author Martin Wünsch
   */
  createComponentType(componentType: ComponentType): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.url, componentType);
  }


 /**
   * Updates the given component type on the server.
   *
   * @param componentType The component type to update.
   *
   * @author Martin Wünsch
   */
  updateComponentType(componentType: ComponentType): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.url + '/' + componentType.id, componentType);
  }


  /**
   * Deletes the given component type from the server.
   *
   * @param componentType The component type to delete.
   *
   * @author Martin Wünsch
   */
  deleteComponentType(componentType: ComponentType): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(this.url + '/' + componentType.id);
  }
}
