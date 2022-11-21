<?php

include '../../connection/basedatos.php';


extract($_POST);

if(isset($idCargo) && !empty($idCargo)){

    $cargo = new BaseDatos();
    
    $res = $cargo->editarCargo($idCargo,$nombreCargo);


    if($res == TRUE){

        echo json_encode("ingresado");

    }else{

        echo json_encode("ERROR");

    }

}else{

    echo json_encode("sin datos");

}
