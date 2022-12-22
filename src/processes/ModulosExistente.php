<?php

include_once '../connection/ValidacionUsuario.php';

$ModulosBD = new ValidacionUsuario();

$Modulos = $ModulosBD->MostrarModulos();

while ($filas = mysqli_fetch_array($Modulos)) {

    $modulos[] = array(
        'id' => $filas['id'],
        'nombre' => $filas['modulos'],
    );
}


echo json_encode(array('modulos' => $modulos));
