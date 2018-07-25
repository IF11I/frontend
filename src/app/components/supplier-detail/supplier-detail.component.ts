import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

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
    private dialog: MatDialog,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Suppliers · Detail');

    // Get the current supplier by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          // Create a new attribute.
          this.title.setTitle('IT-Verwaltung · Suppliers · New');
          return of(new Supplier());
        } else {
          // Get the exising attribute.
          return this.supplierService.getSupplierById(+idParam);
        }
      })
    ).subscribe(supplier => this.supplier = supplier);
  }


  /**
   * Save or create the current supplier.
   *
   * @author Nils Weber
   */
  private saveSupplier() {
    if (this.supplier.id) {
      this.supplierService.updateSupplier(this.supplier);
    } else {
      this.supplierService.createSupplier(this.supplier);
    }

    this.router.navigateByUrl('/suppliers');
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
    this.supplierService.deleteSupplier(this.supplier);
    this.router.navigateByUrl('/suppliers');
  }

}
