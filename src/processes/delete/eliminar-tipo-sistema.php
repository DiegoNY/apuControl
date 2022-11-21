<?php
include '../../connection/basedatos.php';
$id = $_POST['id'];

if (isset($id)) {
    
    $tipoSistema = new BaseDatos();
    
    $resultado = $tipoSistema->eliminarTipoSistema($id);
    if (!isset($resultado)) {
        die('Fallo :,,u ');
    }else{
        echo "eliminado"; 
    }
  
}else{
    echo "sin resultado";
}
