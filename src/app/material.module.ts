import { NgModule } from '@angular/core';

import {
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

/** Material modules to import/export. */
const materialModules = [
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
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
