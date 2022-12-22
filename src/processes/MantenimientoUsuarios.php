<?php

include '../connection/MantenimientoUsuarioBD.php';

extract($_POST);


$usuarios = new MantenimientoUsuarios();

$accion = "";
$respuesta = ["Sin Peticiones"];

switch ($accion) {
    case "Editar":
        try {
            if (!empty($cargo and isset($cargo)) and !empty($idUsuario and isset($idUsuario)) and !empty($contraseña and isset($contraseña)) and !empty($cargo and isset($cargo)))
                $res = $usuarios->EditarUsuario($idUsuario, $usuario, $contraseña, $cargo);
            else $camposVacios = "no todos los campos estan completos";
        } catch (Exception $e) {

            $Error =  $e->getMessage();
        }

        $respuesta = array('Error' => $camposVacios ?? $Error);


        break;

    case "Mostrar":

        $usuarios->MostrarUsuarios();
        
        $todosUsuarios = $usuarios->usuarios;

        $respuesta = array('usuarios' => $todosUsuarios);

        break;

    case "Eliminar":
        $usuarios->EliminarUsuario($idUsuario);
        break;

    default:
        # code...
        break;
}





echo json_encode($respuesta);
