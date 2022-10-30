<?php 

include '../../connection/basedatos.php';
//data
$id = $_POST['id'];
//validacion
if(isset($id)){
    $acceso = new BaseDatos();
    $id = $acceso->sanitizar($id);

    $res = $acceso->eliminarAcceso($id);
    if(!isset($res)){
        die('Fallo ... ');
    }else{
        echo "alert-success";
    }
}else{
    echo "alert-danger";
}
