import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';
import { SmartRecycleService } from  'src/app/services/smart-recycle.service'
import { SerialService } from 'src/app/services/serial.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css'],
})
export class VerUsuarioComponent implements OnInit {  
  datosUsuario: Usuario = {
    nombre: '',
    facultad: '',
    puntos: 0,
  };

  constructor(private smartRecycleService: SmartRecycleService, private serialService: SerialService) {}

  async ngOnInit(): Promise<void> {
    // Conectar MetaMask al cargar
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    console.log('MetaMask conectado');
  }

  async cargarDatos(direccion: string) {
    const usuario = await this.smartRecycleService.getUser(direccion);

    this.datosUsuario = {
      nombre: usuario[0],
      facultad: usuario[1],
      puntos: usuario[2],
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
