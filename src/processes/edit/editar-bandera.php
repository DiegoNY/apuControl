<?php

include '../../connection/basedatos.php';


$nombre = $_POST['nombreBandera'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];
$rutaLogo = "";

extract($_POST);



if (isset($nombre) && !empty($nombre)){
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;

    move_uploaded_file($temporal, "../.$carpeta". '/' . $logo);

    $bandera = new BaseDatos();

    if($editarLogo === "editar"){

        $rutaLogo = $ruta;
        
    }else{
    
        $rutaLogo = $urlLogo; 
    
    }

    $res =  $bandera->editarBandera($idBandera,$nombre,$rutaLogo);

    $json = array();
    if ($res === TRUE) {
        echo "ingresado";
    } else {
        echo  "error";
    }
}else{
    echo "sin datos";
}
