import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Attribute } from 'src/app/model/attribute';
import { AttributeService } from 'src/app/services/attribute.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

/**
 * Component for handling displaying/editing/deleting a single attribute.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.css']
})
export class AttributeDetailComponent implements OnInit {

  /** The attribute currently displayed. */
  private attribute = new Attribute();


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private attributeService: AttributeService,
    private dialog: MatDialog,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Attributes · Detail');

    // Get the current attribute by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');

        if (idParam === 'new') {
          // Create a new attribute.
          this.title.setTitle('IT-Verwaltung · Attributes · New');
          return of(new Attribute());
        } else {
          // Get the exising attribute.
          return this.attributeService.getAttributeById(+idParam);
        }
      })
    ).subscribe(attribute => this.attribute = attribute);
  }


  /**
   * Save or create the current attribute.
   *
   * @author Nils Weber
   */
  private saveAttribute() {
    if (this.attribute.id) {
      // Attribute exists in the database: Update it.
      this.attributeService.updateAttribute(this.attribute);
    } else {
      // Attribute doesn't exists in the database: Create it.
      this.attributeService.createAttribute(this.attribute);
    }

    this.router.navigateByUrl('/attributes');
  }


  /**
   * Ask for the user's confirmation for deleting the current attribute.
   *
   * @author Nils Weber
   */
  private confirmAttributeDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteAttribute(); }});
  }


  /**
   * Delete the current attribute.
   * This shouldn't be called directly from a button click since no confirmation is required.
   *
   * @author Nils Weber
   */
  private deleteAttribute() {
    this.attributeService.deleteAttribute(this.attribute);
    this.router.navigateByUrl('/attributes');
  }

}
