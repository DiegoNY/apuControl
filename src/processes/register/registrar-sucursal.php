<?php

include '../../connection/basedatos.php';
extract($_GET);

if(isset($txtNombreSucursal) && !empty($txtNombreSucursal)){

$sucursal = new  BaseDatos();

$txtNombreSucursal = $sucursal->sanitizar($txtNombreSucursal);
$txtDireccionSucursal = $sucursal->sanitizar($txtDireccionSucursal);
$txtEstado = $sucursal->sanitizar($txtEstado);
$txtCodigoCofide = $sucursal->sanitizar($txtCodigoCofide);
$cboIdu = $sucursal->sanitizar($cboIdu);

$resultado = $sucursal->registrarSucursal($txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide,$cboIdu,$txtEstado,$ruc_id);

$cantidad_sucursales = $resultado[1];

$id_sucursal = $cantidad_sucursales + 1;

$resultadoss = $sucursal->registrarAccesos($id_sucursal, $txtNombreAcceso, $txtIdAcceso, $txtContraseña, $txtEstado);


if($resultado == TRUE){
    echo "ingresado"; 
}else{
    echo "error";
}

}else{
    echo "sin datos";
    
}

