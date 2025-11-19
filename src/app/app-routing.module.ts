import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent
  },
  {
    path: 'login',
    component: LoginComponent
    //canActivate: [proteccionGuard]
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
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
