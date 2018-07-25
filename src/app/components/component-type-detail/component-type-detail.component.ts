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
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-component-type-detail',
  templateUrl: './component-type-detail.component.html',
  styleUrls: ['./component-type-detail.component.css']
})
export class ComponentTypeDetailComponent implements OnInit {

  @ViewChild('attributesList') attributesList: MatSelectionList;

  private componentType = new ComponentType();
  private attributes: Attribute[] = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private componentTypeService: ComponentTypeService,
    private attributeService: AttributeService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Component Types · Detail');

    this.attributeService.getAttributes().subscribe(attrs => this.attributes = attrs);

    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          this.title.setTitle('IT-Verwaltung · Component Types · New');
          return of(new ComponentType());
        } else {
          return this.componentTypeService.getTypeById(+idParam);
        }
      })
    ).subscribe(componentType => this.setComponentType(componentType));
  }


  private isAttributeSelected(attribute: Attribute) {
    return !!this.componentType.attributes.find(attr => attr.id === attribute.id);
  }


  private setComponentType(componentType: ComponentType) {
    this.componentType = componentType;
  }


  private saveComponentType() {
    const selectedAttributes = this.attributesList.selectedOptions.selected.map(item => item.value);
    this.componentType.attributes = selectedAttributes;

    if (this.componentType.id) {
      this.componentTypeService.updateType(this.componentType);
    } else {
      this.componentTypeService.deleteType(this.componentType);
    }

    this.router.navigateByUrl('/componenttypes');
  }


  private confirmComponentTypeDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteComponentType(); }});
  }


  private deleteComponentType() {
    this.componentTypeService.deleteType(this.componentType);
    this.router.navigateByUrl('/componenttypes');
  }

}
