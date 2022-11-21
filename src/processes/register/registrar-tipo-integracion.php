<?php

//con ajax se mandan los datos pro get los extraemos y capturamos las variables quew son los nombres de los formularios
extract($_GET);

include("../../connection/basedatos.php");
$tipoIntegracion = new BaseDatos();

/**
 * recibe valor cuando funcion sea insertar se insertaran los datos
 */

if (isset($txtNombreIntegracion) && !empty($txtNombreIntegracion)) {
    //Los datos
    $nombre = $tipoIntegracion->sanitizar($txtNombreIntegracion);
    $estado = $tipoIntegracion->sanitizar($txtEstadoIntegracion);
    $fecha = $tipoIntegracion->sanitizar($txtFechaIntegracion);

    //La insercion y la respuesta 👌

    $res = $tipoIntegracion->registrarTipoIntegracion($estado,$nombre,$fecha);
    if ($res == TRUE) {

        echo "ingresado";
    } else {
        echo  "error";
    }
}else{
    echo "sin datos";
}
