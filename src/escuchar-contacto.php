<?php

include 'connection/basedatos.php';

$id = $_POST['id'];

$contacto = new BaseDatos();

$resultado= $contacto->verContacto($id);

if(!$resultado){
    die("Fallo en la consulta");
}

$json = array();

while($row = mysqli_fetch_array($resultado)){
    $json[] = array(
        'id'=>$row['id'],
        'id_empresa'=>$row['id_empresa'],
        'nombre_contacto'=>$row['nombre_contacto'],
        'cargo'=>$row['cargo'],
        'telefono'=>$row['telefono'],
        'correo'=>$row['correo'],
    );
}
$jsonString = json_encode($json[0]);

echo $jsonString;
