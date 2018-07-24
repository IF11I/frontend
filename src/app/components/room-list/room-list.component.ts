import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  private dataSource = new MatTableDataSource();
  private columnsToDisplay = ['number', 'name', 'actions'];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.roomService.getRooms().subscribe(rooms => this.dataSource.data = rooms);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
