<?php 
include 'connection/basedatos.php';

$grupos = new BaseDatos();

$resultado = $grupos->verGrupos();

if(!$resultado){
    die('Query Failed');
}

$json = array();
while($row = mysqli_fetch_array($resultado)){

 $json[] = array(
    'id' => $row['id'],
    'nombre' => $row['nombre'],
    'descripcion' =>$row['descripcion'],
    'estado' => $row['estado'],
    'usuarioCreacion' => $row['usuarioCreacion'],
    'fechaCreacion' => $row['fechaCreacion'],
 );  
}

$jsonString =  json_encode($json);
echo $jsonString;

?>