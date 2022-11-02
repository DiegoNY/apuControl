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

if($resultado == TRUE){
    echo "ingresado"; 
}else{
    echo "error";
}

}else{
    echo "sin datos";
}
