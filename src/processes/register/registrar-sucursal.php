<?php

include '../../connection/basedatos.php';

$nombre = $_POST['txtNombreSucursal'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];


if (isset($nombre) && !empty($nombre)) {
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;
    move_uploaded_file($temporal, "../.$carpeta" . '/' . $logo);

}




extract($_POST);

if(isset($txtNombreSucursal) && !empty($txtNombreSucursal)){

$sucursal = new  BaseDatos();

$txtNombreSucursal = $sucursal->sanitizar($txtNombreSucursal);
$txtDireccionSucursal = $sucursal->sanitizar($txtDireccionSucursal);
$txtEstado = $sucursal->sanitizar($txtEstado);
$txtCodigoCofide = $sucursal->sanitizar($txtCodigoCofide);
$cboIdub = $sucursal->sanitizar($cboIdub);

#retorna cantidad de sucursales y TRUE si se ingreso correctamente 

$resultado = $sucursal->registrarSucursal($txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide ?? "",$cboIdub,$txtEstado,$ruc_id_su,$codigoApu ?? "",$banderaEmpresa ?? "",$ruta);

#Se cuentan las sucursales, los accesos estan ligados al id de la sucursal :: 

$cantidad_sucursales   = $resultado[1];
$id_sucursal           = $cantidad_sucursales + 1;

#accesos

var_dump( $_POST);

for ($i=0; $i < count( $acceso ) ; $i++) {

    $sucursal->registrarAccesos($id_sucursal,$acceso[$i],$usuario[$i],$contraseña[$i] ?? " ",1,"",$cboTipoSistema[$i]??"","");
    
}


for ($i=0; $i < count($cboIdTipoIntegracion) ; $i++) { 
    $sucursal->registrarSistema($id_sucursal,$cboTipoSistema[$i],$proveedor[$i],$cboIdTipoIntegracion[$i],1);
}



if($resultado == TRUE){
    echo "ingresado "; 
    

}else{
    echo "error";
}

}else{

    echo "sin datos " ;

}   

