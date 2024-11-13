import { Component, inject } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent {
  private _snackBar = inject(MatSnackBar);

  registroUsuarioForm: FormGroup = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    facultad: new FormControl("", [Validators.required]),
  })
  
  nuevoUsuario: Usuario = {
    nombre: '',
    facultad: '',
    puntos: 0,
  };

  registrarUsuario() {
    this.nuevoUsuario.nombre = this.registroUsuarioForm.controls["nombre"].value;
    this.nuevoUsuario.facultad = this.registroUsuarioForm.controls["facultad"].value;;
    this.nuevoUsuario.puntos = 0;

    console.log(this.nuevoUsuario);

    this._snackBar.open("Usuario registrado", "", { duration: 3000 })
    this.registroUsuarioForm.reset();
  }
}
