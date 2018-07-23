import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
  ],
})
export class MaterialModule { }
