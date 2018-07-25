import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component as ComponentEntity } from 'src/app/model/component';
import { Room } from 'src/app/model/room';
import { Supplier } from 'src/app/model/supplier';
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
    // TODO: private componentService: ComponentService,
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
          // TODO: return this.componentService.getTypeById(+idParam);
        }
      })
    ).subscribe(component => this.component = component);
  }

}
