import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AdminComponent } from './pages/admin/admin.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    AdminComponent,
    DetallePeliculaComponent,
    AsientosComponent,
    MembresiaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
