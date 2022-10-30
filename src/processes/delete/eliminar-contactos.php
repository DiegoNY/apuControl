<?php

include '../../connection/basedatos.php';

$id = $_POST['id'];

if(isset($id)){
    $contactos = new BaseDatos();

    $resultado = $contactos->eliminarContacto($id);
    if(!$resultado){
        die("Fallo... 😿");
    }else{
        echo $resultado;
    }
}   
