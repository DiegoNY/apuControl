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

