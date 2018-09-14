import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SortByPipe } from './pipes/sort-by.pipe';

import { AuthguardGuard } from './authguard.guard';
import { ListComponent } from './list/list.component';
import { MessageService } from './services/message.service';
import { EventEmitterService } from './services/event-emitter.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    SortByPipe,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'message', component: MessageComponent, canActivate: [AuthguardGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'contacts', component: ListComponent, canActivate: [AuthguardGuard] }
    ])
  ],
  providers: [
    MessageService,
    EventEmitterService,
    AuthguardGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
