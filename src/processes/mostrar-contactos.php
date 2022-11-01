<?php
include '../connection/basedatos.php';

extract($_GET);

if (!isset($id)) {

    $json = array();

} else {

    $contactos = new BaseDatos();

    $resultado = $contactos->verContactos($id);

    if (!$resultado) {
        die("Query failed");
    }

    $json = array();

    while ($row = mysqli_fetch_array($resultado)) {

        $json['data'][] = array(

            'id' => $row['id'],
            'id_empresa' => $row['id_empresa'],
            'nombre' => $row['nombre_contacto'],
            'cargo' => $row['cargo'],
            'telefono' => $row['telefono'],
            'correo' => $row['correo'],
        );
    }
}

$jsonString = json_encode($json);

echo $jsonString;
