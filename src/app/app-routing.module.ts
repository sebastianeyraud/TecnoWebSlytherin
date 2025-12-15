import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent} from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';
import { CompraComponent } from './pages/compra/compra.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { ProteccionGuard } from './guards/proteccion.guard';
import { ProteccionAdminGuard } from './guards/proteccion-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ProteccionGuard, ProteccionAdminGuard]
  },
  {
    path: 'cartelera',
    component: CarteleraComponent
  },
  {
    path: 'comprar',
    component: CompraComponent
  },
  {
    path: 'pelicula/:titulo',
    component: DetallePeliculaComponent
  },
  { path: 'asientos/:titulo',
    component: AsientosComponent

  },
  { path: 'membresia', component: MembresiaComponent, canActivate: [AuthGuard] },
  { path: 'promociones', component: PromocionesComponent },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
