import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  private dataSource = new MatTableDataSource();
  private columnsToDisplay = ['name', 'street', 'postalCode', 'city', 'actions'];

  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.supplierService.getSuppliers().subscribe(suppliers => this.dataSource.data = suppliers);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
