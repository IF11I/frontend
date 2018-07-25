import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { ComponentType } from 'src/app/model/component-type';
import { ComponentTypeService } from 'src/app/services/component-type.service';

@Component({
  selector: 'app-component-type-list',
  templateUrl: './component-type-list.component.html',
  styleUrls: ['./component-type-list.component.css']
})
export class ComponentTypeListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  private dataSource = new MatTableDataSource();
  private columnsToDisplay = ['name', 'actions'];

  constructor(private title: Title, private componentTypeService: ComponentTypeService) { }

  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Component Types');
    this.dataSource.sort = this.sort;
    this.componentTypeService.getComponentType().subscribe(types => this.dataSource.data = types);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
