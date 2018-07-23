import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MaterialModule { }
