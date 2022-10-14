<?php
include 'connection/basedatos.php';
$id = $_POST['id'];
if (isset($id)) {
    
    $grupo = new BaseDatos();
    $id = $grupo->sanitizar($id);

    $resultado = $grupo->eliminarGrupo($id);
    if (!isset($resultado)) {
        die('Fallo :,,u ');
    }else{
        echo $resultado; 
    }
  
}
