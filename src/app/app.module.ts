import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { SideBarComponent } from './shared/sidebar/sidebar.component'
import { HeaderComponent } from './shared/header/header.component'
import { AlertComponent } from './shared/alert/alert.component';
import { LogInComponent } from './component/login/login.component'
import { RegisterComponent } from './component/register/register.component'
import { ChatComponent } from './component/chat/chat.component'
import { AlertService, AuthenticationService, AuthGuard } from './service/index'

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    LogInComponent,
    RegisterComponent,
    AlertComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    SideBarComponent,
    HeaderComponent
  ],
  providers: [
    AuthenticationService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
