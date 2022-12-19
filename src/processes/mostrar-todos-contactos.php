<?php
include '../connection/basedatos.php';




$contactos = new BaseDatos();

$resultado = $contactos->verTodosContactos();

if (!$resultado) {
    die("Query failed");
}

$json = array();

// while ($rowss = mysqli_fetch_array($resultado)) {
//     $idEmpresa = $rowss['id_empresa'];
// }

// 

// while($info = mysqli_fetch_array($empresainfo)){
//     $razon = $info['razon_social'];
// }

// 

while ($row = mysqli_fetch_array($resultado)) {

    $empresainfo = $contactos->verEmpresa($row['id_empresa']);

    while ($info = mysqli_fetch_array($empresainfo)) {
        $razon = $info['razon_social'];
    }

    $informacionEmpresa = $row['id_empresa']." - ".$razon;

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
