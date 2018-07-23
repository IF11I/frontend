import { Component, OnInit } from '@angular/core';

import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  private rooms: Room[] = [];
  private columnsToDisplay = ['number', 'name'];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

}
