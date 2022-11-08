<?php 
include '../../connection/basedatos.php';
extract($_GET);

$sucursal = new BaseDatos();

$res = $sucursal->editarSucursal($txtIdSucursal,$txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide,$cboIdu,$ruc_id);
$acce = $acceso->editarAcceso($txtIdSucursal,$txtNombreAcceso,$txtIdAcceso,$txtContraseña,$id_acceso);

if(!$res){
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";
