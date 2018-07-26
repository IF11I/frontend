import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
    return this.httpClient.get<Attribute>(this.url + '/' + id);
  }


  /**
   * Creates a new attribute on the server.
   *
   * @param attribute The attribute to create.
   *
   * @author Martin Wünsch
   */
  createAttribute(attribute: Attribute): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.url, attribute);
  }


  /**
   * Updates the given attribute on the server.
   *
   * @param attribute The attribute to update.
   *
   * @author Martin Wünsch
   */
  updateAttribute(attribute: Attribute): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.url + '/' + attribute.id, attribute);
  }


  /**
   * Deletes the given attribute from the server.
   *
   * @param attribute The attribute to delete.
   *
   * @author Martin Wünsch
   */
  deleteAttribute(attribute: Attribute): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(this.url + '/' + attribute.id);
  }

}
