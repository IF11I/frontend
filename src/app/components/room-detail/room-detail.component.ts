import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ResponseMessage } from 'src/app/model/response-message';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { StatusDialogService } from 'src/app/services/status-dialog.service';

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

  /** Reference to the input form. */
  @ViewChild('form') form: ElementRef<HTMLFormElement>;


  /** The room currently displayed. */
  public room = new Room();


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private statusDialogService: StatusDialogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Räume · Details');

    // Get the current room by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');

        if (idParam === 'new') {
          // Create a new room.
          this.title.setTitle('IT-Verwaltung · Räume · Neu');
          return of(new Room());
        } else {
          // Get the exising room.
          return this.roomService.getRoomById(+idParam);
        }
      })
    ).subscribe(
      room => this.room = room,
      error => this.statusDialogService.displayError(error)
    );
  }


  /**
   * Save or create the current room.
   *
   * @author Nils Weber
   */
  saveRoom() {
    // Don't procede if form is invalid.
    if (!this.form.nativeElement.checkValidity()) {
      this.snackBar.open('Bitte füllen Sie alle Felder aus', 'OK', { duration: 5000 });
      return;
    }

    let saveUpdate$: Observable<ResponseMessage>;

    if (this.room.id) {
      // Room exists in the database: Update it.
      saveUpdate$ = this.roomService.updateRoom(this.room);
    } else {
      // Room doesn't exists in the database: Create it.
      saveUpdate$ = this.roomService.createRoom(this.room);
    }

    this.handleResponseMessage(saveUpdate$);
  }


  /**
   * Ask for the user's confirmation for deleting the current room.
   *
   * @author Nils Weber
   */
  confirmRoomDeletion() {
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
    this.handleResponseMessage(this.roomService.deleteRoom(this.room));
  }


  /**
   * Handles an observable `ResponseMessage` and redirects to list view on success.
   *
   * @author Nils Weber
   */
  private handleResponseMessage(response$: Observable<ResponseMessage>) {
    response$.subscribe(response => {
      this.statusDialogService.displayResponse(response);
      if (response.isSuccessful) { this.router.navigateByUrl('/rooms'); }
    },
    error => this.statusDialogService.displayError(error));
  }

}
