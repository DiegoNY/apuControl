<?php

include '../../connection/basedatos.php';

extract($_GET);

if(isset($txtNombreAcceso) and !empty($txtNombreAcceso) || isset($txtContraseña) and !empty($txtContraseña) || isset($txtIdAcceso) and !empty($txtIdAcceso)) {

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
