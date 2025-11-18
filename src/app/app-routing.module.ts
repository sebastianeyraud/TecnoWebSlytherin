import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
import { AsientosComponent } from './pages/asientos/asientos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MembresiaComponent } from './membresia/membresia.component';

//Guards
import { ProteccionGuard } from './guards/proteccion.guard';
import { ProteccionAdminGuard } from './guards/proteccion-admin.guard';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ProteccionGuard, ProteccionAdminGuard] },
  { path: 'cartelera', component: CarteleraComponent},
  { path: 'pelicula/wicked', component: DetallePeliculaComponent },
  { path: 'asientos', component: AsientosComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'membresia', component: MembresiaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

