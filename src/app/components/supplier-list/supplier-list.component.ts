import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { SupplierService } from 'src/app/services/supplier.service';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

/**
 * Component for displaying a list of all available supplier.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  /** Reference to the table's sorting handler. */
  @ViewChild(MatSort) sort: MatSort;

  /** The table's data source. */
  private dataSource = new MatTableDataSource();

  /** The columns to display in the table. */
  private columnsToDisplay = ['name', 'street', 'postalCode', 'city', 'actions'];


  constructor(
    private title: Title,
    private supplierService: SupplierService,
    private statusDialogService: StatusDialogService,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Suppliers');
    this.dataSource.sort = this.sort;
    this.supplierService.getSuppliers().subscribe(
      suppliers => this.dataSource.data = suppliers,
      error => this.statusDialogService.displayError(error));
  }


  /**
   * Applies a given filter to the table.
   *
   * @param filterValue The value by which the table should be filterd.
   *
   * @author Nils Weber
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
