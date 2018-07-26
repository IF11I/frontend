import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { AttributeService } from 'src/app/services/attribute.service';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

/**
 * Component for displaying a list of all available attributes.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {

  /** Reference to the table's sorting handler. */
  @ViewChild(MatSort) sort: MatSort;


  /** The table's data source. */
  public dataSource = new MatTableDataSource();

  /** The columns to display in the table. */
  public columnsToDisplay = ['label', 'actions'];


  constructor(
    private title: Title,
    private attributeService: AttributeService,
    private statusDialogService: StatusDialogService,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Attribute');
    this.dataSource.sort = this.sort;
    this.attributeService.getAttributes().subscribe(attributes => this.dataSource.data = attributes,
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
