import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    LoginComponent,
    AdminComponent,
    DetallePeliculaComponent,
    AsientosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }