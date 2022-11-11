<?php

session_start();


include_once '../../connection/basedatos.php';

$bd = new BaseDatos();

if(empty($_POST['txtUsuario'])||empty($_POST['txtContraseña'])){
    echo json_encode("vacios");
}



$usuario = $_POST['txtUsuario'];
$contraseña = $_POST['txtContraseña'];


$res = $bd->validarUsuarios($usuario,$contraseña);

if($res == false){
    echo json_encode('no existe');
}else{
    
    $_SESSION = $res;
    
   $nombreUsers = json_encode($res);

   echo $nombreUsers;

//    if($nombreUsers === $res){

//     echo $nombreUsers;
//    }else{

//     echo json_encode('no existe');

//    }
    
}

