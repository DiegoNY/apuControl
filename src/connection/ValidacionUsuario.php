<?php

require '../connection/basedatos.php';


class ValidacionUsuario extends BaseDatos
{


    public function MostrarModulos()
    {
        $consulta = 'SELECT * FROM `modulos` as M WHERE (M.estatus = 1 )';
        $respuesta = mysqli_query($this->con, $consulta);

        return $respuesta;
    }

    public function Permisos($id)
    {
        $consulta = "SELECT * FROM `permisos` AS P WHERE ( '$id' = P.id_usuario)";
        $respuesta = mysqli_query($this->con, $consulta);

        return $respuesta;
    }
    
}
