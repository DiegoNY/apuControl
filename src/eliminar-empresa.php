<?php
include 'connection/basedatos.php';

$id = $_POST['id'];


if (isset($id)) {

    $empresas = new BaseDatos();

    $id = $empresas->sanitizar($id);

    $res = $empresas->borrarEmpresas($id);

    if (!isset($res)) {

        die('Fallo ... ');

    } else {

        echo "alert-success";
        
    }
}
