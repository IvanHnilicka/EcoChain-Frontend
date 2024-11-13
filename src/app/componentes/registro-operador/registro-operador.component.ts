import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Operador } from 'src/app/modelos/Operador';

@Component({
  selector: 'app-registro-operador',
  templateUrl: './registro-operador.component.html',
  styleUrls: ['./registro-operador.component.css']
})
export class RegistroOperadorComponent {
  private _snackBar = inject(MatSnackBar);
  
  registroOperadorForm: FormGroup = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    facultad: new FormControl("", [Validators.required]),
    direccion: new FormControl("", [Validators.required])
  })

  nuevoOperador : Operador = {
    nombre: "",
    facultad: "",
    puntos: 0
  }

  registrarOperador(){
    this.nuevoOperador.nombre = this.registroOperadorForm.controls["nombre"].value;
    this.nuevoOperador.facultad = this.registroOperadorForm.controls["nombre"].value;
    this.nuevoOperador.puntos = 0;
    
    console.log(this.nuevoOperador);

    this._snackBar.open("Operador registrado", "", { duration: 3000 });
    this.registroOperadorForm.reset();    
  }
}
