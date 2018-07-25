import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  private room = new Room();

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Rooms · Detail');

    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          this.title.setTitle('IT-Verwaltung · Rooms · New');
          return of(new Room());
        } else {
          return this.roomService.getRoomById(+idParam);
        }
      })
    ).subscribe(room => this.room = room);
  }


  private saveRoom() {
    if (this.room.id) {
      this.roomService.updateRoom(this.room);
    } else {
      this.roomService.createRoom(this.room);
    }

    this.router.navigateByUrl('/rooms');
  }


  private confirmRoomDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteRoom(); }});
  }


  private deleteRoom() {
    this.roomService.deleteRoom(this.room);
    this.router.navigateByUrl('/rooms');
  }

}
