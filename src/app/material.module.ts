import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
  ],
  exports: [
    MatButtonModule,
  ],
})
export class MaterialModule { }
