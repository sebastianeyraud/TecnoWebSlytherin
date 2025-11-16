import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { CarteleraComponent } from './cartelera/cartelera.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
=======
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> 216bc660d52f0ff57d0b88c400c428c239406a7d

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    CarteleraComponent,
    HeaderComponent,
    FooterComponent
=======
    PrincipalComponent,
    LoginComponent,
    PerfilComponent,
    AdminComponent
>>>>>>> 216bc660d52f0ff57d0b88c400c428c239406a7d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
