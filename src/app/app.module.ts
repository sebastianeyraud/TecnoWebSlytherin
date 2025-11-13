import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    PerfilComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
