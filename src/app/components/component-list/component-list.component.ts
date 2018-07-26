import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { forkJoin } from 'rxjs';

import { ComponentService } from 'src/app/services/component.service';
import { RoomService } from 'src/app/services/room.service';
import { ComponentTypeService } from 'src/app/services/component-type.service';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

/**
 * Component for displaying a list of all available components.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {

  /** Reference to the table's sorting handler. */
  @ViewChild(MatSort) sort: MatSort;


  /** The table's data source. */
  private dataSource = new MatTableDataSource<ComponentViewModel>();

  /** The columns to display in the table. */
  private columnsToDisplay = ['componentName', 'componentTypeName', 'componentManufacturer', 'roomNumber', 'roomName', 'actions'];


  constructor(
    private title: Title,
    private componentService: ComponentService,
    private componentTypeService: ComponentTypeService,
    private roomService: RoomService,
    private statusDialogService: StatusDialogService,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Komponenten');
    this.dataSource.sort = this.sort;

    // Get observables for all required resources.
    const components$ = this.componentService.getComponents();
    const componentTypes$ = this.componentTypeService.getComponentTypes();
    const rooms$ = this.roomService.getRooms();

    // Wait for all observables to finish executing.
    forkJoin([ components$, componentTypes$, rooms$ ]).subscribe(results => {
      const [ components, componentTypes, rooms ] = results;

      // Map ComponentEntity to ComponentViewModel.
      this.dataSource.data = components.map(component => {
        const componentType = componentTypes.find(_componentType => _componentType.id === component.componentTypeId);
        const room = rooms.find(_room => _room.id === component.roomId);

        return {
          componentId: component.id,
          componentName: component.name,
          componentManufacturer: component.manufacturer,
          componentTypeName: componentType.name,
          roomNumber: room.number,
          roomName: room.name,
        };
      });
    },
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


/**
 * View Model for displaying a component in the list.
 *
 * @author Nils Weber
 */
interface ComponentViewModel {

  componentId: number;
  componentName: string;
  componentManufacturer: string;
  componentTypeName: string;
  roomNumber: string;
  roomName: string;

}
