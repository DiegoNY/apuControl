<?php
include '../../connection/basedatos.php';

$id = $_POST['id'];


if (isset($id)) {

    $bandera = new BaseDatos();


    $res = $bandera->eliminarBanderaSu($id);

    if (!isset($res)) {

        die('Fallo ... ');

    } else {

        echo "alert-success";
        
    }
}
