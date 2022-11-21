<?php
include '../../connection/basedatos.php';
extract($_GET);

$acceso = new BaseDatos();

$res = $acceso->editarAcceso($txtIdSucursal,$txtNombreAcceso,$txtIdAcceso,$txtContraseña,$id_acceso);


if(!$res){
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";

