import { HttpModule } from '@angular/http';
import { AuthService } from './shared/service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KEYCLOAK_HTTP_PROVIDER } from './shared/service/keycloak.http';
import { KeycloakService } from './shared/service/keycloak.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [KEYCLOAK_HTTP_PROVIDER,
    KeycloakService,
    AuthService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
