<?php
include '../connection/basedatos.php';




$contactos = new BaseDatos();

$resultado = $contactos->verTodosContactos();

if (!$resultado) {
    die("Query failed");
}

$json = array();


while ($row = mysqli_fetch_array($resultado)) {
   
    
    $informacionEmpresa = $row['id_empresa'] . " - " . $row['razon_social'];

    $json['data'][] = array(

        'id' => $row['id'],
        'id_empresa' => $informacionEmpresa,
        'nombre' => $row['nombre_contacto'],
        'cargo' => $row['cargo'],
        'telefono' => $row['telefono'],
        'correo' => $row['correo'],
    );
}

$jsonString = json_encode($json);

echo $jsonString;
