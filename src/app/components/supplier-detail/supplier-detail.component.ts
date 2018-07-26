import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ResponseMessage } from 'src/app/model/response-message';
import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

/**
 * Component for handling displaying/editing/deleting a single supplier.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  /** The supplier currently displayed. */
  private supplier = new Supplier();


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private statusDialogService: StatusDialogService,
    private dialog: MatDialog,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Zulieferer · Details');

    // Get the current supplier by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          // Create a new attribute.
          this.title.setTitle('IT-Verwaltung · Zulieferer · Neuer Zulieferer');
          return of(new Supplier());
        } else {
          // Get the exising attribute.
          return this.supplierService.getSupplierById(+idParam);
        }
      })
    ).subscribe(
      supplier => this.supplier = supplier,
      error => this.statusDialogService.displayError(error)
    );
  }


  /**
   * Save or create the current supplier.
   *
   * @author Nils Weber
   */
  private saveSupplier() {
    let saveUpdate$: Observable<ResponseMessage>;

    if (this.supplier.id) {
      // Supplier exists in the database: Update it.
      saveUpdate$ = this.supplierService.updateSupplier(this.supplier);
    } else {
      // Supplier doesn't exists in the database: Create it.
      saveUpdate$ = this.supplierService.createSupplier(this.supplier);
    }

    this.handleResponseMessage(saveUpdate$);
  }


  /**
   * Ask for the user's confirmation for deleting the current supplier.
   *
   * @author Nils Weber
   */
  private confirmSupplierDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteSupplier(); }});
  }


  /**
   * Delete the current supplier.
   * This shouldn't be called directly from a button click since no confirmation is required.
   *
   * @author Nils Weber
   */
  private deleteSupplier() {
    this.handleResponseMessage(this.supplierService.deleteSupplier(this.supplier));
  }


  /**
   * Handles an observable `ResponseMessage` and redirects to list view on success.
   *
   * @author Nils Weber
   */
  private handleResponseMessage(response$: Observable<ResponseMessage>) {
    response$.subscribe(response => {
      this.statusDialogService.displayResponse(response);
      if (response.isSuccessful) { this.router.navigateByUrl('/suppliers'); }
    },
    error => this.statusDialogService.displayError(error));
  }

}
