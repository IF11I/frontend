import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './components/supplier-detail/supplier-detail.component';
import { ComponentTypeListComponent } from './components/component-type-list/component-type-list.component';
import { ComponentTypeDetailComponent } from './components/component-type-detail/component-type-detail.component';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';
import { AttributeDetailComponent } from './components/attribute-detail/attribute-detail.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { ComponentDetailComponent } from './components/component-detail/component-detail.component';

/** The app's routes. */
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'room/:id', component: RoomDetailComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'supplier/:id', component: SupplierDetailComponent },
  { path: 'componenttypes', component: ComponentTypeListComponent },
  { path: 'componenttype/:id', component: ComponentTypeDetailComponent },
  { path: 'attributes', component: AttributeListComponent },
  { path: 'attribute/:id', component: AttributeDetailComponent },
  { path: 'components', component: ComponentListComponent },
  { path: 'component/:id', component: ComponentDetailComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

/**
 * A module for handling the app's routing functionality.
 *
 * @author Nils Weber
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
