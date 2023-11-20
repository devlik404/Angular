import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HackerDetailComponent } from './hacker-detail/hacker-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//materialAngular
import { MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { CardsComponent } from './cards/cards.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CardListComponent } from './list-card/list-card.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,


        //materialAngularstyling
        MatSlideToggleModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,

     BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HackerDetailComponent,
    CardsComponent,
    CardListComponent,
    ModalComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
