import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  private supplier = new Supplier();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          return of(new Supplier());
        } else {
          return this.supplierService.getSupplierById(+idParam);
        }
      })
    ).subscribe(supplier => this.supplier = supplier);
  }


  private saveSupplier() {
    if (this.supplier.id) {
      // this.supplierService.updateRoom(this.supplier);
    } else {
      // this.supplierService.createRoom(this.supplier);
    }

    this.router.navigateByUrl('/suppliers');
  }


  private confirmSupplierDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteSupplier(); }});
  }


  private deleteSupplier() {
    // this.supplierService.deleteSupplier(this.supplier);
    this.router.navigateByUrl('/suppliers');
  }
}
