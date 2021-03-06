import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { forkJoin } from 'rxjs';

import { RoomService } from 'src/app/services/room.service';
import { ComponentService } from 'src/app/services/component.service';
import { ComponentTypeService } from 'src/app/services/component-type.service';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

/**
 * Component for displaying a list of all available rooms.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  /** Reference to the table's sorting handler. */
  @ViewChild(MatSort) sort: MatSort;


  /** The table's data source. */
  public dataSource = new MatTableDataSource<RoomViewModel>();

  /** The columns to display in the table.  */
  public columnsToDisplay = ['roomNumber', 'roomName', 'componentTypeList', 'actions'];


  constructor(
    private title: Title,
    private roomService: RoomService,
    private componentService: ComponentService,
    private componentTypeService: ComponentTypeService,
    private statusDialogService: StatusDialogService
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Räume');
    this.dataSource.sort = this.sort;

    // Get observables for all required resources.
    const rooms$ = this.roomService.getRooms();
    const components$ = this.componentService.getComponents();
    const componentTypes$ = this.componentTypeService.getComponentTypes();

    // Wait for all observables to finish executing.
    forkJoin([ rooms$, components$, componentTypes$ ]).subscribe(results => {
      const [ rooms, components, componentTypes ] = results;

      // Map Room to RoomViewModel.
      this.dataSource.data = rooms.map(room => {
        // Save component type counts in the form of 'componentTypeName: count';
        const typeCounts = {};

        // Count component types.
        const x = components
          .filter(component => component.roomId === room.id)
          .map(component => componentTypes.find(componentType => componentType.id === component.componentTypeId).name)
          .forEach(typeName => { if (typeName in typeCounts) { typeCounts[typeName] += 1; } else { typeCounts[typeName] = 1; } });

        // Combine component type name and count.
        const typeNamesWithCounts = Object.keys(typeCounts).map(typeName => typeCounts[typeName] + 'x' + typeName);

        return {
          roomId: room.id,
          roomNumber: room.number,
          roomName: room.name,
          componentTypeList: typeNamesWithCounts.join(', ')
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
 * ViewModel for displaying a room in the list.
 *
 * @author Nils Weber
 */
interface RoomViewModel {

  roomId: number;
  roomNumber: string;
  roomName: string;
  componentTypeList: string;

}
