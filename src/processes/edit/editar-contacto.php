<?php 
echo "editando ... ";

include '../../connection/basedatos.php';

extract($_GET);

echo $txtEmpresa;

$contacto = new BaseDatos();

$resultado = $contacto->editarContacto($id_contacto,$txtNombre,$txtCargo,$txtEmpresa,$txtTelefono,$txtCorreo);

if(!$resultado){
    die("Consulta Fallida");
}

echo "ingresado";