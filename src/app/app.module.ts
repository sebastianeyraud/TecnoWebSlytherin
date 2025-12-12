import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent} from './pages/perfil/perfil.component';

import { AdminComponent } from './pages/admin/admin.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';
import { HeroComponent } from './components/hero/hero.component';
import { PeliculaFormComponent } from './components/formulario-pelicula/formulario-pelicula.component';
import { CompraComponent } from './pages/compra/compra.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';


@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    AdminComponent,
    DetallePeliculaComponent,
    AsientosComponent,
    HeroComponent,
    PeliculaFormComponent,
    CompraComponent,
    MembresiaComponent,
    PromocionesComponent
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