import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ResponseMessage } from '../model/response-message';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private url = '/api/suppliers';


  constructor(private httpClient: HttpClient) { }

  // retrieves all suppliers from the database
  getSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.url);
  }

  // retrieves an supplier from the database per id
  getSupplierById(id: number): Observable<Supplier> {
    return this.httpClient.get<Supplier>(this.url + '/' + id);
  }

  // creates an supplier on the database
  createSupplier(supplier: Supplier): Observable<ResponseMessage> {
    var x = this.httpClient.post<Supplier>('/api/suppliers', supplier).subscribe(res => {
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

 // updates room on the server
 updateSupplier(supplier: Supplier): Observable<ResponseMessage> {
  var x = this.httpClient.put<Supplier>(this.url + "/" + supplier.id, supplier).subscribe(res => {
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

// deletes a room on the server
deleteSupplier(supplier: Supplier): Observable<ResponseMessage> {
  this.httpClient.delete(this.url + "/" + supplier.id).subscribe(res => {
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
