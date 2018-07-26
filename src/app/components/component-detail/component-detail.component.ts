import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Component as ComponentEntity } from 'src/app/model/component';
import { Room } from 'src/app/model/room';
import { Supplier } from 'src/app/model/supplier';
import { ComponentService } from 'src/app/services/component.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { RoomService } from 'src/app/services/room.service';
import { ComponentType } from 'src/app/model/component-type';
import { ComponentTypeService } from 'src/app/services/component-type.service';
import { StatusDialogService } from 'src/app/services/status-dialog.service';
import { ResponseMessage } from 'src/app/model/response-message';

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

  /** Reference to the input form. */
  @ViewChild('form') form: ElementRef<HTMLFormElement>;


  /** The component currently displayed. */
  public component = new ComponentEntity();

  /** The list of all available rooms. */
  public rooms: Room[] = [];

  /** The list of all available suppliers. */
  public suppliers: Supplier[] = [];

  /** The list of all availabe component types. */
  public componentTypes: ComponentType[] = [];


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private componentService: ComponentService,
    private roomService: RoomService,
    private supplierService: SupplierService,
    private componentTypeService: ComponentTypeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private statusDialogService: StatusDialogService,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Komponenten · Detail');

    // Get all available rooms.
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);

    // Get all available suppliers.
    this.supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);

    // Get all availabe component types
    this.componentTypeService.getComponentTypes().subscribe(componentTypes => this.componentTypes = componentTypes);

    // Get the current component by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');

        if (idParam === 'new') {
          // Create a new component.
          this.title.setTitle('IT-Verwaltung · Komponenten · Neu');
          return of(new ComponentEntity());
        } else {
          // Get the existing component.
          return this.componentService.getComponentById(+idParam);
        }
      })
    ).subscribe(
      component => this.component = component,
      error => this.statusDialogService.displayError(error)
    );
  }


  /**
   * Save or create the current component.
   *
   * @author Nils Weber
   */
  saveComponent() {
    // Don't procede if form is invalid.
    if (!this.form.nativeElement.checkValidity()) {
      this.snackBar.open('Bitte füllen Sie alle Felder aus', 'OK', { duration: 5000 });
      return;
    }

    let saveUpdate$: Observable<ResponseMessage>;

    if (this.component.id) {
      // Component exists in the database: Update it.
      saveUpdate$ = this.componentService.updateComponent(this.component);
    } else {
      // Component doesn't exists in the database: Create it.
      saveUpdate$ = this.componentService.createComponent(this.component);
    }

    this.handleResponseMessage(saveUpdate$);
  }


  /**
   * Ask for the user's confirmation for deleting the current component.
   *
   * @author Nils Weber
   */
  confirmComponentDeletion() {
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
    this.handleResponseMessage(this.componentService.deleteComponent(this.component));
  }


  /**
   * Event: Gets executed when the component type selection has been changed.
   *
   * @author Nils Weber
   */
  componentTypeSelectionChanged() {
    const componentType = this.componentTypes.find(type => type.id === this.component.componentTypeId);
    this.component.attributes = componentType.attributes.map(({ id, label, value }) => ({ id, label, value }));
  }


  /**
   * Handles an observable `ResponseMessage` and redirects to list view on success.
   *
   * @author Nils Weber
   */
  private handleResponseMessage(response$: Observable<ResponseMessage>) {
    response$.subscribe(response => {
      this.statusDialogService.displayResponse(response);
      if (response.isSuccessful) { this.router.navigateByUrl('/components'); }
    },
    error => this.statusDialogService.displayError(error));
  }

}
