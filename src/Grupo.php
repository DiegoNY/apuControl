<?php 

class Grupo{

    public $nombre;
    public $descripcion; 
    public $estado;
    public $usuarioCreacion;
    public $fechaCrecaion;

    function __construct($nombre,$descripcion,$usuarioCreacion,$fechaCrecaion)
    {
        $this->nombre = $nombre;
        $this->descripcion =$descripcion;
        $this->usuarioCreacion = $usuarioCreacion;
        $this->fechaCrecaion = $fechaCrecaion;
    }

}