import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';

const routes: Routes = [
 { path: 'rooms', component: RoomListComponent },
 { path: 'room/:id', component: RoomDetailComponent },
 { path: 'suppliers', component: SupplierListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
