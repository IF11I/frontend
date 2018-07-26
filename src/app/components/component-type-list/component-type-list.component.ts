import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { ComponentTypeService } from 'src/app/services/component-type.service';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

/**
 * Component for displaying a list of all available component types.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-component-type-list',
  templateUrl: './component-type-list.component.html',
  styleUrls: ['./component-type-list.component.css']
})
export class ComponentTypeListComponent implements OnInit {

  /** Reference to the table's sorting handler. */
  @ViewChild(MatSort) sort: MatSort;


  /** The table's data source. */
  private dataSource = new MatTableDataSource();

  /** The columns to display in the table. */
  private columnsToDisplay = ['name', 'actions'];


  constructor(
    private title: Title,
    private componentTypeService: ComponentTypeService,
    private statusDialogService: StatusDialogService,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Component Types');
    this.dataSource.sort = this.sort;
    this.componentTypeService.getComponentTypes().subscribe(
      types => this.dataSource.data = types,
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
