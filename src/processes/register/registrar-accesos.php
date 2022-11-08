<?php

include '../../connection/basedatos.php';

extract($_POST);
$accesos = new BaseDatos();



$resultado = $accesos->registrarAccesos($txtIdSucursal, $txtNombreAcceso, $txtIdAcceso, $txtContraseña, $txtEstado);


if ($resultado == TRUE) {
    return "ingresado";
} else {
    return "error";
}
