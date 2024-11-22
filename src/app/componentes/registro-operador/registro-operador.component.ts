import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Operador } from 'src/app/modelos/Operador';
import { SmartRecycleService } from  'src/app/services/smart-recycle.service'
import { SerialService } from 'src/app/services/serial.service';

@Component({
  selector: 'app-registro-operador',
  templateUrl: './registro-operador.component.html',
  styleUrls: ['./registro-operador.component.css']
})
export class RegistroOperadorComponent implements OnInit {
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

  constructor(private smartRecycleService: SmartRecycleService, private serialService: SerialService) {}

  async ngOnInit(): Promise<void> {
    // Conectar MetaMask al cargar
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    console.log('MetaMask conectado');
  }

  async registrarOperador(){
    console.log(this.registroOperadorForm.controls["direccion"].value);
    console.log(this.registroOperadorForm.controls["nombre"].value);
    console.log(this.registroOperadorForm.controls["facultad"].value);

    await this.smartRecycleService.registerOperator(this.registroOperadorForm.controls["direccion"].value,this.registroOperadorForm.controls["nombre"].value,this.registroOperadorForm.controls["facultad"].value)

    /*
    this.nuevoOperador.nombre = this.registroOperadorForm.controls["nombre"].value;
    this.nuevoOperador.facultad = this.registroOperadorForm.controls["nombre"].value;
    this.nuevoOperador.puntos = 0;
    
    console.log(this.nuevoOperador);*/

    this._snackBar.open("Operador registrado", "", { duration: 3000 });
    this.registroOperadorForm.reset();    
  }


  //Funciones para leer el puerto serial

  direccionLeida: string | null = null;
  async leerNFC(): Promise<void> {
    this.direccionLeida = await this.serialService.connect();
    if (this.direccionLeida) {
      console.log('Dirección leída del NFC:', this.direccionLeida);
      let direccionInput = document.getElementById("direccion-input") as HTMLInputElement;
      direccionInput.value = this.direccionLeida
      await this.serialService.disconnect();
    } else {
      console.error('No se pudo leer la dirección del NFC');
    }
  }
}
