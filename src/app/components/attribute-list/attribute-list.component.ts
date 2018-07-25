import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { AttributeService } from '../../services/attribute.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  private dataSource = new MatTableDataSource();
  private columnsToDisplay = ['name', 'actions'];

  constructor(private title: Title, private attributeService: AttributeService) { }

  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Attributes');
    this.dataSource.sort = this.sort;
    this.attributeService.getAttributes().subscribe(attributes => this.dataSource.data = attributes);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
