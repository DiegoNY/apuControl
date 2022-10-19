<?php 
include 'connection/basedatos.php';

extract($_GET);

$grupo = new BaseDatos();

$resultado = $grupo->editarGrupo($txtIdGrupo,$txtNombre,$txtDescripcion,$txtUsuCre);

if(!$resultado){
    die("Consulta fallida llama al admin 😢");
}

echo 'ingresado';