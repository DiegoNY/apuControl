<?php

include '../../connection/basedatos.php';

class Usuarios extends BaseDatos
{

    private $nombre;
    private $contraseña;
    private $cargo;

    public $usuario;

    public function __construct($nombre, $contraseña, $cargo)
    {
        $this->nombre = $nombre;
        $this->contraseña = $contraseña;
        $this->cargo = $cargo;

        $this->conectardb();
        $this->usuario  = $this->Registrar();
    }

    public function Registrar()
    {
        $Cantidad = "SELECT COUNT(*)AS ID FROM `usuarios`;";

        $cantidad = mysqli_query($this->con, $Cantidad);

        $numerosUsuarios = mysqli_fetch_array($cantidad);

        $id = $numerosUsuarios['ID'] + 1;

        $Ingresar = "INSERT INTO `usuarios` (usuario,contraseña,cargo, id) VALUES ('$this->nombre','$this->contraseña','$this->cargo','$id');";


        try {

            $ingresar = mysqli_query($this->con, $Ingresar);
        } catch (\Throwable $th) {

            return ['error' =>  $th];
        }

        if (!$ingresar) return 'Error';

        return ['Respuesta' => $ingresar, 'id' => $id];
    }

    public function Permisos($modulo, $usuario)
    {
        $consulta = "INSERT INTO `permisos` (id_modulo,id_usuario) VALUES ('$modulo','$usuario')";
        $respuesta = mysqli_query($this->con, $consulta);

        return $respuesta;
    }

   
}
