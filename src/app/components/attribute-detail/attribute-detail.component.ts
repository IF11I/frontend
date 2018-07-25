import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Attribute } from 'src/app/model/attribute';
import { AttributeService } from 'src/app/services/attribute.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.css']
})
export class AttributeDetailComponent implements OnInit {

  private attribute = new Attribute();

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private attributeService: AttributeService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.title.setTitle('IT-Verwaltung · Attributes · Detail');

    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        const idParam = params.get('id');
        if (idParam === 'new') {
          this.title.setTitle('IT-Verwaltung · Attributes · New');
          return of(new Attribute());
        } else {
          return this.attributeService.getAttributeById(+idParam);
        }
      })
    ).subscribe(attribute => this.attribute = attribute);
  }


  private saveAttribute() {
    if (this.attribute.id) {
      this.attributeService.updateAttribute(this.attribute);
    } else {
      this.attributeService.createAttribute(this.attribute);
    }

    this.router.navigateByUrl('/attributes');
  }


  private confirmAttributeDeletion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => { if (confirmed) { this.deleteAttribute(); }});
  }


  private deleteAttribute() {
    this.attributeService.deleteAttribute(this.attribute);
    this.router.navigateByUrl('/attributes');
  }

}
