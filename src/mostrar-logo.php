<?php 

include 'connection/basedatos.php';

$id = $_GET['id'];
$logos = new BaseDatos();

$resultado = $logos->traerBandera($id);


$json = array();

while($row = mysqli_fetch_array($resultado)){
    
    $json[] = array(
        'id'=>$row['id'],
        'nombre' => $row['nombre'],
        'ruta'=>$row['logo'],
    );
}

$jsonString = json_encode($json);

echo $jsonString;