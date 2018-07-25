import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ComponentType } from 'src/app/model/component-type';
import { ResponseMessage } from 'src/app/model/response-message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
    let x = this.httpClient.post<ComponentType>(this.url, componentType).subscribe(res => {
      console.log(res);
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        return of({ isSuccessful: false, messageText: 'Zulieferer konnte nicht angelegt werden' });
      });

    return of({ isSuccessful: true, messageText: 'Zulieferer angelegt' });
  }


 /**
   * Updates the given component type on the server.
   *
   * @param componentType The component type to update.
   *
   * @author Martin Wünsch
   */
 updateComponentType(componentType: ComponentType): Observable<ResponseMessage> {
  let x = this.httpClient.put<ComponentType>(this.url + '/' + componentType.id, componentType).subscribe(res => {
    console.log(res);
  },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
      return of({ isSuccessful: false, messageText: 'Zulieferer konnte nicht upgedated werden' });
    });
  return of({ isSuccessful: true, messageText: 'Zulieferer upgedated' });
}


/**
 * Deletes the given component type from the server.
 *
 * @param componentType The component type to delete.
 *
 * @author Martin Wünsch
 */
deleteComponentType(componentType: ComponentType): Observable<ResponseMessage> {
  this.httpClient.delete(this.url + '/' + componentType.id).subscribe(res => {
    console.log(res);
  },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
      return of({ isSuccessful: false, messageText: 'Zulieferer konnte nicht gelöscht werden' });
    });
  return of({ isSuccessful: true, messageText: 'Zulieferer gelöscht' });
}
}
