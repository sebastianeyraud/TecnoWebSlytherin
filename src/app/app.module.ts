import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MembresiaComponent } from './membresia/membresia.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
     RouterModule.forRoot([
      { path: '', component: PrincipalComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'membresia', component: MembresiaComponent },
    ]),
    PrincipalComponent // porque es standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
