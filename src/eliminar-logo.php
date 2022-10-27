<?php

include 'connection/basedatos.php';

    $id =$_POST['id'];

    $logo = new BaseDatos();

    $resultado = $logo->eliminarBandera($id);

    if(!$resultado){
        
        die("FALLO");
        
    }else{
    
    echo "borrado";
    
    }

