interface SerialPort {
    open(options: SerialOptions): Promise<void>;
    close(): Promise<void>;
    readable: ReadableStream<Uint8Array> | null;
    writable: WritableStream<Uint8Array> | null;
  }
  
  interface SerialOptions {
    baudRate: number;
    dataBits?: number;
    stopBits?: number;
    parity?: 'none' | 'even' | 'odd';
    bufferSize?: number;
    flowControl?: 'none' | 'hardware';
  }
  
  interface Navigator {
    serial: {
      getPorts(): Promise<SerialPort[]>;
      requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>;
    };
  }
  
  interface SerialPortRequestOptions {
    filters: Array<{
      usbVendorId?: number;
      usbProductId?: number;
    }>;
  }
  