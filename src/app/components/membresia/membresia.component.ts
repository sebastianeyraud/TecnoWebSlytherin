import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioI } from 'src/app/models/interfaces/usuario-i';
import { Membresia } from 'src/app/models/membresia';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  currentUser: UsuarioI | null = null;
  memberships = [Membresia.INSIDER, Membresia.PREMIERE, Membresia.A_LIST];

  constructor(private auth: AuthService, private usuarioS: UsuarioService) {}

  async ngOnInit() {
    const userId = this.auth.getCurrentUser()?.id;
    if (userId != null) {
      this.currentUser = await this.usuarioS.getById(userId) ?? null;
    }
  }

  /**
   * Retorna true si el usuario ya tiene esta membresía
   */
  hasMembership(m: Membresia): boolean {
    return this.currentUser?.membresia === m;
  }

  /**
   * Función que se llama al pulsar el botón
   */
  async toggleMembership(m: Membresia) {
    if (!this.currentUser) return;

    if (this.currentUser.membresia === m) {
      // Salir de la membresía
      this.currentUser.membresia = Membresia.NONE;
    } else if (this.currentUser.membresia === Membresia.NONE) {
      // Unirse si no tiene ninguna
      this.currentUser.membresia = m;
    } else {
      alert(`Ya estás en la membresía ${this.currentUser.membresia}. Primero debes salir.`);
      return;
    }

    // Guardar cambios en IndexedDB y actualizar observable
    await this.usuarioS.update(this.currentUser);
    this.usuarioS.setCurrentUser(this.currentUser);

    // Forzar refresco local para que Angular detecte cambio
    this.currentUser = { ...this.currentUser };
  }


}
