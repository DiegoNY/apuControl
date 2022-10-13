<?php

//con ajax se mandan los datos pro get los extraemos y capturamos las variables quew son los nombres de los formularios
extract($_GET);

/*
Validandon si trajimos los datos 
echo $txtNombre;
echo $txtDescripcion;
echo $txtEstado;
echo $txtUsuCre;
echo $txtFechCre;*/

include("connection/basedatos.php");
$grupo = new BaseDatos();

/**
 * recibe valor cuando funcion sea insertar se insertaran los datos
 */

switch ($txtFuncion) {
    case 'Insertar':
        if (isset($txtNombre) && !empty($txtNombre)) {
            //Los datos
            $nombre = $grupo->sanitizar($txtNombre);
            $descripcion = $grupo->sanitizar($txtDescripcion);
            $estado = $grupo->sanitizar($txtEstado);
            $usuarioCreacion = $grupo->sanitizar($txtUsuCre);
            $fechaCreacion = $grupo->sanitizar($txtFechCre);

            //La insercion y la respuesta 👌

            $res = $grupo->crearGrupo($nombre, $descripcion, $estado, $usuarioCreacion, $fechaCreacion);
            if ($res == TRUE) {

                $arreglo = [ "mensaje" =>"Los datos fueron insertados con exito", "clase" => "alert alert-success" ];

                /*$mensaje = "Los datos fueron insertados con exito";
                $class = "alert alert-success";*/
            } else {
                $arreglo = [ "mensaje" =>"Error al inserar Datos LLama al Admin 😢", "clase" => "alert alert-danger" ];
                /*$mensaje = "Error al inserar Datos LLama al Admin 😢";
                $class = "alert alert-danger";*/
            }
            //validando si lo retorno 
            var_dump($arreglo) ;
        }
        break;

    default:
        # code...
        break;
}
