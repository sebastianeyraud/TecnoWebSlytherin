import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { CarteleraComponent } from './cartelera/cartelera.component';

const routes: Routes = [
  { path: 'cartelera', component: CarteleraComponent },
  { path: '', redirectTo: 'cartelera', pathMatch: 'full' }
];
=======
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProteccionGuard } from './guards/proteccion.guard';
import { ProteccionAdminGuard } from './guards/proteccion-admin.guard';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ProteccionGuard,ProteccionAdminGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [ProteccionGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

>>>>>>> 216bc660d52f0ff57d0b88c400c428c239406a7d

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
