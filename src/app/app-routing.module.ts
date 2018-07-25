import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './components/supplier-detail/supplier-detail.component';
import { ComponentTypeListComponent } from './components/component-type-list/component-type-list.component';
import { ComponentTypeDetailComponent } from './components/component-type-detail/component-type-detail.component';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';

const routes: Routes = [
 { path: 'rooms', component: RoomListComponent },
 { path: 'room/:id', component: RoomDetailComponent },
 { path: 'suppliers', component: SupplierListComponent },
 { path: 'supplier/:id', component: SupplierDetailComponent },
 { path: 'componenttypes', component: ComponentTypeListComponent },
 { path: 'componenttype/:id', component: ComponentTypeDetailComponent },
 { path: 'attributes', component: AttributeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
