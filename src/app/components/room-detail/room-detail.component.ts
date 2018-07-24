import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  private room = new Room();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) { }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          return of(new Room());
        } else {
          return this.roomService.getRoomById(+idParam);
        }
      })
    ).subscribe(room => this.room = room);
  }


  saveRoom() {
    if (this.room.isInDatabase) {
      this.roomService.updateRoom(this.room);
    } else {
      this.roomService.createRoom(this.room);
    }

    this.router.navigateByUrl('/rooms');
  }

}
