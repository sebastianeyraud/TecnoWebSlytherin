import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarteleraComponent } from './pages/cartelera/cartelera.component';
//import { PrincipalComponent } from './pages/principal/principal.component'; // standalone

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';
import { CompraComponent } from './pages/compra/compra.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HeroComponent } from './components/hero/hero.component';
import { PeliculaFormComponent } from './components/formulario-pelicula/formulario-pelicula.component';
import { MembresiaComponent } from './components/membresia/membresia.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,

    CarteleraComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    AdminComponent,
    DetallePeliculaComponent,
    AsientosComponent,
    //CompraComponent,
    PromocionesComponent,

    PeliculaFormComponent,
    MembresiaComponent,
    // UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,

    // ✅ pipes disponibles en templates (Angular 15+)
    AsyncPipe,
    DatePipe,
    CurrencyPipe,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
