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

                $mensaje = "alert-success"; 

            } else {
                $mensaje = "alert-danger" ;
            }
            echo $mensaje;
           
        }
        break;
    case 'Editar':
        echo "Editando...";
    default:
        # code...
        break;
}
