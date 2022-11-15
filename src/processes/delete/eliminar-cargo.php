<?php

include '../../connection/basedatos.php';


$id = $_POST['id'];

if (isset($id)) {
    
    $cargo = new BaseDatos();
    
    $resultado = $cargo->eliminarCargo($id);
    if (!isset($resultado)) {
        die('Fallo :,,u ');
    }else{
        echo $resultado; 
    }
  
  
}
