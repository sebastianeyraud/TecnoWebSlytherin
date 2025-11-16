import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';

const routes: Routes = [
  { path: 'cartelera', component: CarteleraComponent },
  { path: '', redirectTo: 'cartelera', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
