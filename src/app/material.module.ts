import { NgModule } from '@angular/core';

import {
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

/** Material modules to import/export. */
const materialModules = [
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
];

/**
 * A module for handling importing Angular Material's modules.
 */
@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }
