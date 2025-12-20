import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

// Si tienes UsuarioComponent y NO es standalone, descomenta y ajusta el path:
// import { UsuarioComponent } from './pages/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    CarteleraComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    AdminComponent,
    DetallePeliculaComponent,
    AsientosComponent,
    //CompraComponent,
    PromocionesComponent,

    HeroComponent,
    PeliculaFormComponent,
    MembresiaComponent,
    // UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
