import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './components/AppComponent/app.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './components/supplier-detail/supplier-detail.component';
import { ComponentTypeListComponent } from './components/component-type-list/component-type-list.component';
import { ComponentTypeDetailComponent } from './components/component-type-detail/component-type-detail.component';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';
import { AttributeDetailComponent } from './components/attribute-detail/attribute-detail.component';

// Services
import { AttributeService } from './services/attribute.service';
import { ComponentTypeService } from './services/component-type.service';
import { RoomService } from './services/room.service';
import { SupplierService } from './services/supplier.service';

/**
 * The app's main module that ties everything together.
 */
@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    RoomListComponent,
    RoomDetailComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    ComponentTypeListComponent,
    ComponentTypeDetailComponent,
    AttributeListComponent,
    AttributeDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AttributeService,
    ComponentTypeService,
    RoomService,
    SupplierService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule { }
