//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract SmartRecycle {
    address owner;
    constructor() {
        owner = msg.sender;
    }

    struct Operador {
        string nombre;
        string facultad;        
        uint32 puntos;
    }

    struct Usuario {
        string nombre;
        string facultad;
        uint32 puntos;
    }

    mapping (address => Usuario) Usuarios;
    mapping (address => Operador) Operadores;

    function RegistroUsuario(string memory nombre, string memory facultad) public usuario_is_null {
        Usuario storage NuevoUsuario = Usuarios[msg.sender];
        NuevoUsuario.nombre = nombre;
        NuevoUsuario.facultad = facultad;
        NuevoUsuario.puntos = 0;
    }
    function RegistroOperador(address direccion, string memory nombre, string memory facultad) public is_owner{
        Operador memory OperadorActual = Operadores[direccion];
        require(keccak256(abi.encodePacked(OperadorActual.nombre)) == keccak256(abi.encodePacked(""))) ;
        Usuario memory VerificarUsuario = Usuarios[direccion];
        require(keccak256(abi.encodePacked(VerificarUsuario.nombre)) != keccak256(abi.encodePacked("")));
            Operador storage NuevoOperador = Operadores[direccion];
            NuevoOperador.nombre = nombre;
            NuevoOperador.facultad = facultad;
            NuevoOperador.puntos = 0;
    }

    function Reciclaje(address direccion, uint32 material, uint32 cantidad) public is_operador payable {
        Usuario storage UsuarioActual = Usuarios[direccion];
        require(direccion != msg.sender, "El operador no puede auto-validarse.");
        require(keccak256(abi.encodePacked(UsuarioActual.nombre)) != keccak256(abi.encodePacked("")), "Usuario no existe");
        require(material != 0, "Material no registrado");
        require(cantidad != 0, "Cantidad no registrada");
        uint32 precio = 0;
        if(material == 1) {
            precio = 50;
        } 
        else if(material == 2) {
                precio = 30;
        } 
        else if(material == 3) {
                precio = 20;
        } 
        else if(material == 4) {
                precio = 10;
        } 
        else if(material == 5 || material == 6) {
                precio = 5;
        } 
        else if(material == 7 || material == 8) {
                precio = 3;
        } 
        else if(material == 9) {
                precio = 2;
        }
        else {
            revert("Material no reconocido");
        }
        UsuarioActual.puntos = UsuarioActual.puntos + (precio * cantidad);
        }

    function CanjearPuntos(address direccion, uint32 cantidad) public is_operador payable {
        Usuario storage UsuarioActual = Usuarios[direccion];
        Operador storage OperadorActual = Operadores[msg.sender];
        require(keccak256(abi.encodePacked(UsuarioActual.nombre)) != keccak256(abi.encodePacked("")), "Usuario no existe");
        require(cantidad != 0, "Cantidad no registrada");
        if(UsuarioActual.puntos < cantidad) {
            revert("No cuenta con los puntos suficientes");
        } 
        else {
            UsuarioActual.puntos =UsuarioActual.puntos - cantidad;
            OperadorActual.puntos = OperadorActual.puntos + cantidad;
        }
    }

    function VerUsuario(address direccion) public view returns (Usuario memory) {
        Usuario memory result = Usuarios[direccion];
        return result;
    }
    
    //Modificadores
    modifier usuario_is_null() {
        Usuario memory UsuarioActual = Usuarios[msg.sender];
        require(keccak256(abi.encodePacked((UsuarioActual.nombre))) == keccak256(abi.encodePacked(("")))) ;
        _;
    }

    modifier is_operador(){
        bool result = false;
        Operador memory OperadorActual = Operadores[msg.sender];
        if(msg.sender == owner || keccak256(abi.encodePacked((OperadorActual.nombre))) != keccak256(abi.encodePacked(("")))){
            result = true;
        }
        require(result);
        _;
    }

    modifier is_owner() {
        require(msg.sender == owner);
        _;
    }

}