<?php

include '../connection/basedatos.php';

$id = $_GET['id'];

$accesos = new BaseDatos();

$resultado = $accesos->mostrarAccesos($id);


if(!$resultado){
    die("Query failed");
}

$json = array();

while($row = mysqli_fetch_array($resultado)){
    
    $json['data'][] = array(
        'id'=>$row['id'],
        'id_sucursal' => $row['id_sucursal'],
        'nombreAcceso'=>$row['nombreAcceso'],
        'idAcceso'=>$row['idAcceso'],
        'contrasena'=>$row['contraseña'],
    );
}
$jsonString = json_encode($json);

echo $jsonString;