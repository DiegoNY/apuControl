<?php

include '../../connection/basedatos.php';


$nombre = $_POST['nombreBandera'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];


if (isset($nombre) && !empty($nombre)){
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;

    move_uploaded_file($temporal, "../.$carpeta". '/' . $logo);

    $bandera = new BaseDatos();
    $res =  $bandera->ingresarBanderaSu($ruta,$nombre,$nombreBandera,1);

    $json = array();
    if ($res === TRUE) {
        echo "ingresado";
    } else {
        echo  "error";
    }
}else{
    echo "sin datos";
}
