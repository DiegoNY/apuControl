<?php 
include '../connection/basedatos.php';

$tipoIntegracion = new BaseDatos();

$resultado = $tipoIntegracion->mostrarTiposIntegracion();

if(!$resultado){
    die('Query Failed');
}

$json = array();
$form = array();
while($row = mysqli_fetch_array($resultado)){

 $json[] = array(
    'id' => $row['id'],
    'nombre' => $row['nombre'],
    'estado' => $row['estado'],
    'fecha' => $row['fecha'],
 );  


}

$jsonString =  json_encode($json);
echo $jsonString;