<?php 

include '../../connection/basedatos.php';

 extract($_POST);

 $rubro = new BaseDatos();




if (isset($nombre) && !empty($nombre)) {

    $res = $rubro->registrarRubro($nombre,1,$fecha);
    
    if ($res == TRUE) {
        echo json_encode("ingresado");
    } else {
        echo  "error";
    }
    
}else{
    echo json_encode("sin datos");
}
