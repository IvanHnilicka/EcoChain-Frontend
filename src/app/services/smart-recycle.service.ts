import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class SmartRecycleService {
  private contractAddress = '0x5963b83c95236e743fA13B4a6D889898DDd82A3a'; 
  private abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "direccion",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "cantidad",
          "type": "uint32"
        }
      ],
      "name": "CanjearPuntos",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "direccion",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "material",
          "type": "uint32"
        },
        {
          "internalType": "uint32",
          "name": "cantidad",
          "type": "uint32"
        }
      ],
      "name": "Reciclaje",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "direccion",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "nombre",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "facultad",
          "type": "string"
        }
      ],
      "name": "RegistroOperador",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "nombre",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "facultad",
          "type": "string"
        }
      ],
      "name": "RegistroUsuario",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "direccion",
          "type": "address"
        }
      ],
      "name": "VerUsuario",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "nombre",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "facultad",
              "type": "string"
            },
            {
              "internalType": "uint32",
              "name": "puntos",
              "type": "uint32"
            }
          ],
          "internalType": "struct SmartRecycle.Usuario",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;
  private contract: ethers.Contract | undefined;


  constructor() {
    // Inicializa la conexión con MetaMask
    this.initializeProvider();
  }

  private async initializeProvider(): Promise<void> {
    this.provider = new ethers.BrowserProvider((window as any).ethereum); 
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signer);
  }

  // Métodos para interactuar con el contrato

  async registerUser(nombre: string, facultad: string): Promise<void> {
    if (!this.contract) throw new Error('Contract not initialized');
    const tx = await this.contract['RegistroUsuario'](nombre, facultad); 
    await tx.wait();
    console.log('Usuario registrado');
  }

  async registerOperator(direccion: string, nombre: string, facultad: string): Promise<void> {
    if (!this.contract) throw new Error('Contract not initialized');
    const tx = await this.contract['RegistroOperador'](direccion, nombre, facultad);
    await tx.wait();
    console.log('Operador registrado');
  }

  async recycle(direccion: string, material: number, cantidad: number): Promise<void> {
    if (!this.contract) throw new Error('Contract not initialized');
    const tx = await this.contract['Reciclaje'](direccion, material, cantidad, {
      value: ethers.parseEther('0'), 
    });
    await tx.wait();
    console.log('Reciclaje procesado');
  }

  async redeemPoints(direccion: string, cantidad: number): Promise<void> {
    if (!this.contract) throw new Error('Contract not initialized');
    const tx = await this.contract['CanjearPuntos'](direccion, cantidad);
    await tx.wait();
    console.log('Puntos canjeados');
  }

  async getUser(direccion: string): Promise<any> {
    if (!this.contract) throw new Error('Contract not initialized');
    const user = await this.contract['VerUsuario'](direccion);
    console.log('Datos del usuario:', user);
    return user;
  }
}
