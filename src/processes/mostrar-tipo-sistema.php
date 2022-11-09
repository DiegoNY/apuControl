<?php 
include '../connection/basedatos.php';

$tipoSistema = new BaseDatos();

$resultado = $tipoSistema->mostrarTiposSistema();

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