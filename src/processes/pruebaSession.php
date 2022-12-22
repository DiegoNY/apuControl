<?php

// se valida la sesion esta se genera en los cookies 

session_start();

include_once '../connection/ValidacionUsuario.php';

$ses = $_SESSION['usuario'];
$cargo = $_SESSION['cargo'];
$id = $_SESSION['id'];


$r = new ValidacionUsuario();

$permisosUsuario = $r->Permisos($id);

while ($row = mysqli_fetch_array($permisosUsuario)) {
    $permisos[] = array(
        'id' => $row['id'],
        'modulo' => $row['id_modulo']
    );
}

$_SESSION['permisos'] = $permisos;

$PERMISO = $_SESSION['permisos'];


echo json_encode(array('usuario' => array($ses, $cargo, 'permisos' => $PERMISO)));
