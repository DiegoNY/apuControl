<?php

include 'connection/basedatos.php';

$resulrado = extract($_GET);

if (isset($txtIdSucursal) && !empty($txtIdSucursal)) {

    $accesos = new BaseDatos();

    $resultado = $accesos->registrarAccesos($txtIdSucursal, $txtNombreAcceso, $txtIdAcceso, $txtContraseña, $txtEstado);


    if ($resultado == TRUE) {
        echo $mensaje = "alert-succes";
    } else {
        echo $mensaje = "alert-danger";
    }
} else {
    echo $mensaje = "ingresa datos";
}
