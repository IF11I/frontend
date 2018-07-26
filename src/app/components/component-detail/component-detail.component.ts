import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Component as ComponentEntity } from 'src/app/model/component';
import { Room } from 'src/app/model/room';
import { Supplier } from 'src/app/model/supplier';
import { ComponentService } from 'src/app/services/component.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { RoomService } from 'src/app/services/room.service';

/**
 * Component for handling displaying/editing/deleting a single component.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {

  /** The component currently displayed. */
  private component = new ComponentEntity();

  /** The list of all available rooms. */
  private rooms: Room[] = [];

  /** The list of all available suppliers. */
  private suppliers: Supplier[] = [];


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private componentService: ComponentService,
    private roomService: RoomService,
    private supplierService: SupplierService,
    private dialog: MatDialog,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Components · Detail');

    // Get all available rooms.
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);

    // Get all available suppliers.
    this.supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);

    // Get the current component by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');

        if (idParam === 'new') {
          // Create a new component.
          this.title.setTitle('IT-Verwaltung · Components · New');
          return of(new ComponentEntity());
        } else {
          // Get the existing component.
          return this.componentService.getComponentById(+idParam);
        }
      })
    ).subscribe(component => this.component = component);
  }


  /**
   * Save or create the current component.
   *
   * @author Nils Weber
   */
  private saveComponent() {
    if (this.component.id) {
      // Component exists in the database: Update it.
      this.componentService.updateComponent(this.component);
    } else {
      // Component doesn't exists in the database: Create it.
      this.componentService.createComponent(this.component);
    }

    this.router.navigateByUrl('/components');
  }


  /**
   * Ask for the user's confirmation for deleting the current component.
   *
   * @author Nils Weber
   */
  private confirmComponentDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteComponent(); }});
  }


  /**
   * Delete the current component.
   * This shouldn't be called directly from a button click since no confirmation is required.
   *
   * @author Nils Weber
   */
  private deleteComponent() {
    this.componentService.deleteComponent(this.component);
    this.router.navigateByUrl('/components');
  }

}
