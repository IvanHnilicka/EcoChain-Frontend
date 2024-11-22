import { Component, OnInit, inject } from '@angular/core';
import { SmartRecycleService } from  'src/app/services/smart-recycle.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SerialService } from 'src/app/services/serial.service';

@Component({
  selector: 'app-canjear-puntos',
  templateUrl: './canjear-puntos.component.html',
  styleUrls: ['./canjear-puntos.component.css']
})
export class CanjearPuntosComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);

  direccion: string = ''; // Dirección del operador
  puntos: number = 0;   // Puntos a Canjear

  constructor(private smartRecycleService: SmartRecycleService, private serialService: SerialService) {}

  async ngOnInit(): Promise<void> {
    // Conectar MetaMask al cargar
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    console.log('MetaMask conectado');
  }

  async canjear(){
    console.log(this.direccion)
    console.log(this.puntos)
    
    await this.smartRecycleService.redeemPoints(this.direccion,this.puntos)

    this._snackBar.open("Puntos Canjeados", "", { duration: 3000 })

    this.direccion = ''
    
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
