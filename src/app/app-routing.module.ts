import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProteccionGuard } from './guards/proteccion.guard';
import { ProteccionAdminGuard } from './guards/proteccion-admin.guard';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
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
    path: 'pelicula/wicked',
    component: DetallePeliculaComponent
  },
  { path: 'asientos',
    component: AsientosComponent

  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
