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
import { MembresiaComponent } from './membresia/membresia.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { ProteccionGuard } from './guards/proteccion.guard';
import { ProteccionAdminGuard } from './guards/proteccion-admin.guard';

const routes: Routes = [
  // 1. RUTA POR DEFECTO: Ahora, la primera ruta es la redirección.
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  
  // 2. RUTA PRINCIPAL: Reubicamos el PrincipalComponent bajo un path específico.
  //    (Si lo dejas como estaba, el PrincipalComponent nunca se mostrará).
  { path: 'home', component: HomeComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ProteccionGuard, ProteccionAdminGuard] },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'pelicula/wicked', component: DetallePeliculaComponent },
  { path: 'asientos', component: AsientosComponent },
  { path: 'membresia', component: MembresiaComponent, canActivate: [AuthGuard] },
  
  // 3. RUTA WILDCARD: Captura cualquier otra ruta no definida y redirige.
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

