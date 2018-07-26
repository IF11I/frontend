import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ResponseMessage } from '../model/response-message';
import { Supplier } from '../model/supplier';

/**
 * Service to handle CRUD operations for suppliers.
 *
 * @author Matrin Wünsch
 */
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  /** The URL to the corresponding REST route. */
  private url = '/api/suppliers';


  constructor(private httpClient: HttpClient) { }


  /**
   * Returns all suppliers from the server.
   *
   * @author Matrin Wünsch
   */
  getSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.url);
  }


  /**
   * Returns the supplier with the given id from the server.
   *
   * @param id The supplier's id.
   *
   * @author Martin Wünsch
   */
  getSupplierById(id: number): Observable<Supplier> {
    return this.httpClient.get<Supplier>(this.url + '/' + id);
  }


  /**
   * Creates a new supplier on the server.
   *
   * @param supplier The supplier to create.
   *
   * @author Martin Wünsch
   */
  createSupplier(supplier: Supplier): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.url, supplier);
  }


  /**
   * Updates the given supplier on the server.
   *
   * @param supplier The supplier to update.
   *
   * @author Martin Wünsch
   */
  updateSupplier(supplier: Supplier): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.url + '/' + supplier.id, supplier);
  }


  /**
   * Deletes the given supplier from the server.
   *
   * @param supplier The supplier to delete.
   *
   * @author Martin Wünsch
   */
  deleteSupplier(supplier: Supplier): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(this.url + '/' + supplier.id);
  }

}
