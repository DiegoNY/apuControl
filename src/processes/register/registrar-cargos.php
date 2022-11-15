<?php
include '../../connection/basedatos.php';

$cargo = new  BaseDatos();

extract($_POST);

if(isset($nombreCargo) && !empty($nombreCargo)){

    $nombre = $cargo->sanitizar($nombreCargo);
    $fecha = $cargo->sanitizar($fechaCargo);
    
    $res = $cargo->registrarCargo($nombre,$fecha,1);
    
    
    if($res == TRUE){

        echo json_encode("ingresado");

    }else{

        echo json_encode("error");
        
    }

}else{

    echo json_encode("sin datos") ;
}

