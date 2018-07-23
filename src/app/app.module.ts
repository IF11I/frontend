import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './components/AppComponent/app.component';
import { RoomListComponent } from './components/room-list/room-list.component';

// Services
import { RoomService } from './services/room.service';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    RoomService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
