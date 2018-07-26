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
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
  MatMomentDateModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
];

/**
 * A module for handling importing Angular Material's modules.
 */
@NgModule({
  imports: materialModules,
  exports: materialModules,
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
})
export class MaterialModule { }
