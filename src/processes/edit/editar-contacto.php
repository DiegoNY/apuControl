<?php 

include '../../connection/basedatos.php';

extract($_GET);


$contacto = new BaseDatos();

$resultado = $contacto->editarContacto($id_contacto,$txtNombre,$txtCargo,$ruc_id,$txtTelefono,$txtCorreo,$detalleContacto);

if(!$resultado){
    die("Consulta Fallida");
}

echo "ingresado";