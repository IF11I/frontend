import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

/**
 * Component for handling displaying/editing/deleting a single room.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  /** The room currently displayed. */
  private room = new Room();


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private dialog: MatDialog,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Rooms · Detail');

    // Get the current room by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');

        if (idParam === 'new') {
          // Create a new room.
          this.title.setTitle('IT-Verwaltung · Rooms · New');
          return of(new Room());
        } else {
          // Get the exising room.
          return this.roomService.getRoomById(+idParam);
        }
      })
    ).subscribe(room => this.room = room);
  }


  /**
   * Save or create the current room.
   *
   * @author Nils Weber
   */
  private saveRoom() {
    if (this.room.id) {
      // Room exists in the database: Update it.
      this.roomService.updateRoom(this.room);
    } else {
      // Room doesn't exists in the database: Create it.
      this.roomService.createRoom(this.room);
    }

    this.router.navigateByUrl('/rooms');
  }


  /**
   * Ask for the user's confirmation for deleting the current room.
   *
   * @author Nils Weber
   */
  private confirmRoomDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteRoom(); }});
  }

  /**
   * Delete the current room.
   * This shouldn't be called directly from a button click since no confirmation is required.
   *
   * @author Nils Weber
   */
  private deleteRoom() {
    this.roomService.deleteRoom(this.room);
    this.router.navigateByUrl('/rooms');
  }

}
