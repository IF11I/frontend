import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  private room: Room;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) { }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.roomService.getRoomById(+params.get('id')))
    ).subscribe(room => this.room = room);
  }


  saveRoom() {
    if (this.room.id) {
      this.roomService.updateRoom(this.room);
    } else {
      this.roomService.createRoom(this.room);
    }

    this.router.navigateByUrl('/rooms');
  }

}
