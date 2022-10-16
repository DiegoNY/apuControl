<?php 

include 'connection/basedatos.php';

$data = extract($_GET);

if(isset($txtNombre) && !empty($txtNombre)){

$contactos = new  BaseDatos();
$txtNombre = $contactos->sanitizar($txtNombre);
$txtCargo = $contactos->sanitizar($txtCargo);
$txtEmpresa = $contactos->sanitizar($txtEmpresa);
$txtTelefono = $contactos->sanitizar($txtTelefono);
$txtCorreo = $contactos->sanitizar($txtCorreo);
$txtEstado = $contactos->sanitizar($txtEstado);


$resultado = $contactos->registrarContactos($txtNombre,$txtCargo,$txtEmpresa,$txtTelefono,$txtCorreo,$txtEstado);

if($resultado == TRUE){
    echo $mensaje = "alert-succes";
}else{
    echo $mensaje = "alert-danger";
}

}else{
    echo $mensaje = "ingresa datos";
}

