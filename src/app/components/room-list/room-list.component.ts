import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { RoomService } from 'src/app/services/room.service';

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
  private dataSource = new MatTableDataSource();

  /** The columns to display in the table.  */
  private columnsToDisplay = ['number', 'name', 'actions'];


  constructor(private title: Title, private roomService: RoomService) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Räume');
    this.dataSource.sort = this.sort;
    this.roomService.getRooms().subscribe(rooms => this.dataSource.data = rooms);
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
