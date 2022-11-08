<?php

//con ajax se mandan los datos pro get los extraemos y capturamos las variables quew son los nombres de los formularios
extract($_GET);

include("../../connection/basedatos.php");
$tipoSIstema = new BaseDatos();

/**
 * recibe valor cuando funcion sea insertar se insertaran los datos
 */

if (isset($txtNombre) && !empty($txtNombre)) {
    //Los datos
    $nombre = $tipoSIstema->sanitizar($txtNombre);
    $estado = $tipoSIstema->sanitizar($txtEstado);
    $fecha = $tipoSIstema->sanitizar($txtFecha);

    //La insercion y la respuesta 👌

    $res = $tipoSIstema->registrartipoSIstema($estado,$nombre,$fecha);
    if ($res == TRUE) {

        echo "ingresado";
    } else {
        echo  "error";
    }
}else{
    echo "sin datos";
}
