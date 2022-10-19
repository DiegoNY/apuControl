<?php

include 'connection/basedatos.php';

$resulrado = extract($_GET);

if (isset($txtIdSucursal) && !empty($txtIdSucursal)) {

    $accesos = new BaseDatos();

    $resultado = $accesos->registrarAccesos($txtIdSucursal, $txtNombreAcceso, $txtIdAcceso, $txtContraseña, $txtEstado);


    if ($resultado == TRUE) {
        echo "ingresado";
    } else {
        echo  "error";
    }
} else {
    echo "sin datos";
}
