<?php
include '../../connection/Usuarios.php';

extract($_POST);


if (!empty($usuario)  and !empty($Contraseña) and !empty($cargo) and isset($usuario) and isset($Contraseña) and isset($cargo) ) {


    $Usuario = new Usuarios($usuario, $Contraseña, $cargo);

    if (!empty($Usuario->usuario['id']))
        for ($i = 0; $i < count($modulos); $i++) {

            $Usuario->Permisos($modulos[$i], $Usuario->usuario['id']);
        }

    if (empty($Usuario->usuario['id'])) {

        echo json_encode(array('Error' => 'el usuario ya Existe', 'id' => 2));
        die;
    } else {

        echo json_encode(array('Response' => 'Ingresado'));
    }
} else {

    echo json_encode(array('Error' => 'No todos los datos estan Completos', 'id' => 1 ));

}
