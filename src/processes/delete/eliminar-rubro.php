<?php

include '../../connection/basedatos.php';


$id = $_POST['id'];

if (isset($id)) {
    
    $rubro = new BaseDatos();
    
    $resultado = $rubro->eliminarRubro($id);
    if (!isset($resultado)) {
        die('Fallo :,,u ');
    }else{
        echo $resultado; 
    }
  
  
}
