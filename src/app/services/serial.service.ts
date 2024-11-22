import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  private port: SerialPort | null = null;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null | undefined = undefined;


  constructor() {}

  // Método para solicitar el puerto serial
  async connect(): Promise<string | null> {
    try {
      // Solicitar al usuario que seleccione un puerto serial
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 9600 });

      // Obtener el lector para el puerto serial
      this.reader = this.port.readable?.getReader();

      if (this.reader) {
        // Leer la primera línea del puerto serial
        const line = await this.readLine();
        return line; // Devolver la línea leída
      } else {
        console.error('No se pudo crear un lector para el puerto serial');
        return null;
      }
    } catch (error) {
      console.error('Error al conectar con el puerto serial:', error);
      return null;
    }
  }

  // Método para leer una línea del puerto serial
  private async readLine(): Promise<string | null> {
    const decoder = new TextDecoder(); // Decodificador para convertir los bytes a texto
    let receivedData = '';

    while (true) {
      try {
        const { value, done } = await this.reader?.read()!;
        if (done) {
          // Finalización de la lectura
          return null;
        }
        if (value) {
          // Convertir el valor recibido a texto
          receivedData += decoder.decode(value);

          // Detectar nueva línea (fin de una línea de datos)
          if (receivedData.includes('\n')) {
            const line = receivedData.trim();
            return line; // Devolver la primera línea
          }
        }
      } catch (error) {
        console.error('Error al leer datos del puerto serial:', error);
        return null;
      }
    }
  }

  // Método para desconectar del puerto serial
  async disconnect(): Promise<void> {
    try {
      if (this.reader) {
        await this.reader.cancel();
        this.reader = null;
      }
      if (this.port) {
        await this.port.close();
        this.port = null;
      }
    } catch (error) {
      console.error('Error al desconectar del puerto serial:', error);
    }
  }
}
