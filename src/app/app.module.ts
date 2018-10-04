import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { ReportComponent } from './report/report.component';
import { OrderComponent } from './order/order.component';

import { RestapiService } from './restapi.service';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    ReportComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'display', pathMatch: 'full' },
      { path: 'display', component: DisplayComponent },
      { path: 'order', component: OrderComponent },
      { path: 'report', component: ReportComponent }
    ])
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
