import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ComponentType } from 'src/app/model/component-type';
import { ResponseMessage } from 'src/app/model/response-message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentTypeService {
  private url = '/api/componenttypes';

  constructor(private httpClient: HttpClient) { }

  // retrieves all Component types from the database
  getComponentType(): Observable<ComponentType[]> {
    return this.httpClient.get<ComponentType[]>(this.url);
  }

  // retrieves an Component types from the database per id
  getComponentTypeById(id: number): Observable<ComponentType> {
    return this.httpClient.get<ComponentType>(this.url + '/' + id);
  }

  // creates an Component types on the database
  createComponentType(componentType: ComponentType): Observable<ResponseMessage> {
    var x = this.httpClient.post<ComponentType>(this.url, componentType).subscribe(res => {
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

 // updates Component types on the server
 updateComponentType(componentType: ComponentType): Observable<ResponseMessage> {
  var x = this.httpClient.put<ComponentType>(this.url + "/" + componentType.id, componentType).subscribe(res => {
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

// deletes a Component types on the server
deleteComponentType(componentType: ComponentType): Observable<ResponseMessage> {
  this.httpClient.delete(this.url + "/" + componentType.id).subscribe(res => {
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
