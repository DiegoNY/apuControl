<?php 
include '../../connection/basedatos.php';
extract($_GET);

$sucursal = new BaseDatos();

$res = $sucursal->editarSucursal($id_sucursal,$txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide,$cboIdu,$ruc_id);

if(!$res){
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";
