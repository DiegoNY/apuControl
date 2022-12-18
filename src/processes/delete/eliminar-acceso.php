<?php

include '../../connection/basedatos.php';



extract($_GET);

$accesos = new BaseDatos();

$res = $accesos->eliminarAcceso($acceso, $sucursal);
if (!isset($res)) {
    die('Fallo ... ');
} else {
    echo "alert-success";
}
