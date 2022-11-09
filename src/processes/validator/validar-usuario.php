<?php

if(empty($_POST['txtUsuario'])||empty($_POST['txtContraseña'])){
    header('Location: /apuControl/src/views/index.php#');
}

include_once '../../connection/basedatos.php';
$usuario = $_POST['txtUsuario'];
$contraseña = $_POST['txtContraseña'];

$consulta = $bd->prepare('SELECT * FROM usuarios where nombre = ? and correo = ?;');
$respuesta = $consulta->execute([$usuario,$contraseña]);

if($consulta->rowCount()>=1){
    header('Location: /apuControl/src/views/index.html');
}else{
    header('Location: /apuControl/src/views/index.php#');
    exit();
}