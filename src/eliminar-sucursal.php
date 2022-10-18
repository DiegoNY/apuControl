<?php

include 'connection/basedatos.php';
//data
$id = $_POST['id'];
//validacion
if(isset($id)){
    $sucursal = new BaseDatos();
    $id = $sucursal->sanitizar($id);

    $res = $sucursal->eliminarSucursal($id);
    if(!isset($res)){
        die('Fallo ... ');
    }else{
        echo "alert-success";
    }
}else{
    echo "alert-danger";
}


