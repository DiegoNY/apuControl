<?php
include '../../connection/basedatos.php';
$id = $_POST['id'];
if (isset($id)) {
    
    $tipoIntegracion = new BaseDatos();
    
    $resultado = $tipoIntegracion->eliminarTipoIntegracion($id);
    if (!isset($resultado)) {
        die('Fallo :,,u ');
    }else{
        echo $resultado; 
    }
  
}
