<?php
include '../../connection/basedatos.php';

$ruc = $_POST['txtRuc'];
$nombre = $_POST['txtNombreCo'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];

if (isset($nombre) && !empty($nombre)){
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;

    move_uploaded_file($temporal, "../.$carpeta". '/' . $logo);

    $bandera = new BaseDatos();
    $res =  $bandera->ingresarBandera($ruta, $nombre,$ruc);

    $json = array();
    if ($res === TRUE) {
        
        $json[] = array('mensaje'=>"ingresado",'ruc'=>$ruc);
        $jsonString = json_encode($json);
        echo $jsonString;
    } else {
        echo  "error";
    }
}else{
    echo "sin datos";
}
