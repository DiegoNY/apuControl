<?php 
include '../../connection/basedatos.php';
extract($_GET);

$sucursal = new BaseDatos();

$res = $sucursal->editarSucursal($txtIdSucursal,$txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide,$cboIdu,$ruc_id);

// TEAM_VIEWER = usuariosa , contraseñaa 

$anyDesk = $sucursal->editarAcceso($txtIdSucursal,"ANYDESK",$usuario_ANY,$contraseña_ANY,$id_ANY);

$teamViewer = $sucursal->editarAcceso($txtIdSucursal,"TEAM_VIEWER",$usuariosa,$contraseñaa,$id_TV);

$escritorioRemoto = $sucursal->editarAcceso($txtIdSucursal,"ESCRITORIO_REMOTO",$usuario_ER,$contraseña_ER,$id_ER);

if(!$res){
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";
