import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Attribute } from 'src/app/model/attribute';

import { ResponseMessage } from 'src/app/model/response-message';

/**
 * Service to handle CRUD operations for attributes.
 *
 * @author Matrin Wünsch
 */
@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  /** The URL to the corresponding REST route. */
  private url = '/api/attributes';


  constructor(private httpClient: HttpClient) { }


  /**
   * Returns all attributes from the server.
   *
   * @author Matrin Wünsch
   */
  getAttributes(): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(this.url);
  }


  /**
   * Returns the attribute with the given id from the server.
   *
   * @param id The attribute's id.
   *
   * @author Martin Wünsch
   */
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

  /**
   * Creates a new attribute on the server.
   *
   * @param attribute The attribute to create.
   *
   * @author Martin Wünsch
   */
  }


  /**
   * Updates the given attribute on the server.
   *
   * @param attribute The attribute to update.
   *
   * @author Martin Wünsch
   */
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


  /**
   * Deletes the given attribute from the server.
   *
   * @param attribute The attribute to delete.
   *
   * @author Martin Wünsch
   */
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
