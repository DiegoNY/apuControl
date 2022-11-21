<?php

include '../../connection/basedatos.php';


extract($_POST);

if(isset($idRubro) && !empty($idRubro)){

    $rubro = new BaseDatos();
    
    $res = $rubro->editarRubro($idRubro,$nombre);


    if($res == TRUE){

        echo json_encode("ingresado");

    }else{

        echo json_encode("ERROR");

    }

}else{

    echo json_encode("sin datos");

}
