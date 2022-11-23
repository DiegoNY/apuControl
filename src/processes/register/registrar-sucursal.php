<?php

include '../../connection/basedatos.php';


extract($_POST);

if(isset($txtNombreSucursal) && !empty($txtNombreSucursal)){

$sucursal = new  BaseDatos();

$txtNombreSucursal = $sucursal->sanitizar($txtNombreSucursal);
$txtDireccionSucursal = $sucursal->sanitizar($txtDireccionSucursal);
$txtEstado = $sucursal->sanitizar($txtEstado);
$txtCodigoCofide = $sucursal->sanitizar($txtCodigoCofide);
$cboIdub = $sucursal->sanitizar($cboIdub);

$resultado = $sucursal->registrarSucursal($txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide ?? "",$cboIdub,$txtEstado,$ruc_id_su,$codigoApu ?? "",$banderaEmpresa ?? "");

//Se cuentan las sucursales, los accesos estan ligados al id de la sucursal :: 
$cantidad_sucursales = $resultado[1];

$id_sucursal = $cantidad_sucursales + 1;

$anydes = $sucursal->registrarAccesos($id_sucursal, "TEAM_VIEWER", $usuariosa, $contraseñaa, $txtEstado);
$teamvieew = $sucursal->registrarAccesos($id_sucursal, "ANY_DESK", $usuario_ANY, $contraseña_ANY, $txtEstado);
$escritortii = $sucursal->registrarAccesos($id_sucursal, "ESCRITORIO_REMOTO", $usuario_ER, $contraseña_ER, $txtEstado);

//SI AUMENTAN MAS ACCESOS SE AGREGA UNA LINEA MAS HACERLA DINAMICA CON ARRAYS 


if($resultado == TRUE){
    echo "ingresado"; 
    

}else{
    echo "error";
}

}else{
    echo "sin datos";
    
}

