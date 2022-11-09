<?php 
include '../../connection/basedatos.php';

extract($_GET);

$tipoSistema = new BaseDatos();

$resultado = $tipoSistema->editarTipoSistema($id_tipo_sistema,$txtNombre);

if(!$resultado){
    die("Consulta fallida llama al admin 😢");
}

echo 'ingresado';