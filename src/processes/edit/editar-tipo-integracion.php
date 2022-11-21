<?php 
include '../../connection/basedatos.php';

extract($_GET);

$tipoIntegracion = new BaseDatos();

$resultado = $tipoIntegracion->editartipoIntegracion($id_tipo_integracion,$txtNombreIntegracion);

if(!$resultado){
    die("Consulta fallida llama al admin 😢");
}

echo 'ingresado';