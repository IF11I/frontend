import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

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
    let x = this.httpClient.post<Supplier>(this.url, supplier).subscribe(res => {
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
   * Updates the given supplier on the server.
   *
   * @param supplier The supplier to update.
   *
   * @author Martin Wünsch
   */
 updateSupplier(supplier: Supplier): Observable<ResponseMessage> {
  let x = this.httpClient.put<Supplier>(this.url + '/' + supplier.id, supplier).subscribe(res => {
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
   * Deletes the given supplier from the server.
   *
   * @param supplier The supplier to delete.
   *
   * @author Martin Wünsch
   */
deleteSupplier(supplier: Supplier): Observable<ResponseMessage> {
  this.httpClient.delete(this.url + '/' + supplier.id).subscribe(res => {
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
