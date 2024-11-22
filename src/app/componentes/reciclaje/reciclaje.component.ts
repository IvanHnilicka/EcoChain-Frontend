import { Component, OnInit, inject } from '@angular/core';
import { SmartRecycleService } from  'src/app/services/smart-recycle.service'
import { SerialService } from 'src/app/services/serial.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reciclaje',
  templateUrl: './reciclaje.component.html',
  styleUrls: ['./reciclaje.component.css']
})
export class ReciclajeComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  direccion: string = ''; // Dirección del operador
  material: string = '';  // Material reciclado
  cantidad: number = 0;   // Cantidad reciclada (en kg)



  constructor(private smartRecycleService: SmartRecycleService, private serialService: SerialService) {}

  async ngOnInit(): Promise<void> {
    // Conectar MetaMask al cargar
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    console.log('MetaMask conectado');
  }

  async reciclar(){
    console.log(this.direccion)
    console.log(this.material)
    console.log(this.cantidad)
    await this.smartRecycleService.recycle(this.direccion,+this.material,this.cantidad) //El operador + convierte str a int

    this._snackBar.open("Reciclaje registrado", "", { duration: 3000 })

    this.direccion = ''
    this.material = ''
    this.cantidad = 0
  }

  
  //Funciones para leer el puerto serial

  direccionLeida: string | null = null;
  async leerNFC(): Promise<void> {
    this.direccionLeida = await this.serialService.connect();
    if (this.direccionLeida) {
      console.log('Dirección leída del NFC:', this.direccionLeida);
      this.direccion = this.direccionLeida
      await this.serialService.disconnect();
    } else {
      console.error('No se pudo leer la dirección del NFC');
    }
  }
  

}
