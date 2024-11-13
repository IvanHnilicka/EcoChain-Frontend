import { Component } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css'],
})
export class VerUsuarioComponent {
  datosUsuario: Usuario = {
    nombre: '',
    facultad: '',
    puntos: 0,
  };

  cargarDatos() {
    this.datosUsuario = {
      nombre: 'Ivan Ramirez',
      facultad: 'asdasd',
      puntos: 51234512,
    };

    setTimeout(() => {
      this.datosUsuario = {
        nombre: '',
        facultad: '',
        puntos: null,
      };
    }, 5000)

    let direccionInput = document.getElementById("direccion-input") as HTMLInputElement;
    direccionInput.value = "";
  }
}
