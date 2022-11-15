<?php 

include '../../connection/basedatos.php';

extract($_GET);

if(isset($txtNombre) && !empty($txtNombre)){

$contactos = new  BaseDatos();
$txtNombre = $contactos->sanitizar($txtNombre);
$txtCargo = $contactos->sanitizar($txtCargo);
$txtTelefono = $contactos->sanitizar($txtTelefono);
$txtCorreo = $contactos->sanitizar($txtCorreo);
$txtEstado = $contactos->sanitizar($txtEstado);
 
$resultado = $contactos->registrarContactos($txtNombre,$txtCargo,$ruc_id,$txtTelefono,$txtCorreo,$txtEstado,$detalleContacto);

if($resultado == TRUE){
    echo "ingresado";
}else{
    echo  "error";
}

}else{
    echo "sin datos";

}

