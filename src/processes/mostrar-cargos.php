<?php

include '../connection/basedatos.php';

$cargo = new BaseDatos();

$resultado = $cargo->mostrarCargos();

if(!$resultado){
    die('Query Failed');
}

$json = array();
$form = array();
while($row = mysqli_fetch_array($resultado)){

 $json[] = array(
    'id' => $row['id'],
    'nombre' => $row['nombre'],
    'fecha' => $row['fecha'],
 );  


}

$jsonString =  json_encode($json);
echo $jsonString;
