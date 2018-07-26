import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { MatDialog, MatSelectionList } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ComponentType } from 'src/app/model/component-type';
import { Attribute } from 'src/app/model/attribute';
import { ComponentTypeService } from 'src/app/services/component-type.service';
import { AttributeService } from 'src/app/services/attribute.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { StatusDialogService } from 'src/app/services/status-dialog.service';
import { ResponseMessage } from 'src/app/model/response-message';

/**
 * Component for handling displaying/editing/deleting a single component type.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-component-type-detail',
  templateUrl: './component-type-detail.component.html',
  styleUrls: ['./component-type-detail.component.css']
})
export class ComponentTypeDetailComponent implements OnInit {

  /** Reference to the attribute list. */
  @ViewChild('attributesList') attributesList: MatSelectionList;


  /** The component type currently displayed. */
  private componentType = new ComponentType();

  /** The list of all available attributes. */
  private attributes: Attribute[] = [];


  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private componentTypeService: ComponentTypeService,
    private attributeService: AttributeService,
    private statusDialogService: StatusDialogService,
    private dialog: MatDialog,
  ) { }


  /**
   * Lifecycle-Hook: On Init
   *
   * @author Nils Weber
   */
  ngOnInit() {
    // Set app title.
    this.title.setTitle('IT-Verwaltung · Component Types · Detail');

    // Get all available attributes.
    this.attributeService.getAttributes().subscribe(
      attrs => this.attributes = attrs,
      error => this.statusDialogService.displayError(error));

    // Get the current component type by the id that was passed in through a route parameter.
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');

        if (idParam === 'new') {
          // Create a new component type.
          this.title.setTitle('IT-Verwaltung · Component Types · New');
          return of(new ComponentType());
        } else {
          return this.componentTypeService.getComponentTypeById(+idParam);
        }
      })
    ).subscribe(
      componentType => this.componentType = componentType,
      error => this.statusDialogService.displayError(error));
  }


  /**
   * Check if the given attribute is part of the component type.
   *
   * @param attribute The attribute to check against.
   *
   * @author Nils Weber
   */
  private isAttributeSelected(attribute: Attribute) {
    return !!this.componentType.attributes.find(attr => attr.id === attribute.id);
  }


  /**
   * Save or create the current component type.
   *
   * @author Nils Weber
   */
  private saveComponentType() {
    let saveUpdate$: Observable<ResponseMessage>;

    // Get the selected attributes and add them to the component type.
    const selectedAttributes = this.attributesList.selectedOptions.selected.map(item => item.value);
    this.componentType.attributes = selectedAttributes;

    if (this.componentType.id) {
      // Component type exists in the database: Update it.
      saveUpdate$ = this.componentTypeService.updateComponentType(this.componentType);
    } else {
      // Component type doesn't exists in the database: Create it.
      saveUpdate$ = this.componentTypeService.createComponentType(this.componentType);
    }

    this.handleResponseMessage(saveUpdate$);
  }


  /**
   * Ask for the user's confirmation for deleting the current attribute.
   *
   * @author Nils Weber
   */
  private confirmComponentTypeDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteComponentType(); }});
  }


  /**
   * Delete the current attribute.
   * This shouldn't be called directly from a button click since no confirmation is required.
   *
   * @author Nils Weber
   */
  private deleteComponentType() {
    this.handleResponseMessage(this.componentTypeService.deleteComponentType(this.componentType));
  }


  /**
   * Handles an observable `ResponseMessage` and redirects to list view on success.
   *
   * @author Nils Weber
   */
  private handleResponseMessage(response$: Observable<ResponseMessage>) {
    this.statusDialogService.handleResponseMessage(response$);
    response$.subscribe(response => {
      if (response.isSuccessful) { this.router.navigateByUrl('/componenttypes'); }
    });
  }

}
