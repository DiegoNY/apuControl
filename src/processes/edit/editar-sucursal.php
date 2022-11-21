<?php
include '../../connection/basedatos.php';
extract($_POST);

$sucursal = new BaseDatos();

$res = $sucursal->editarSucursal($txtIdSucursal, $txtNombreSucursal, $txtDireccionSucursal, $txtCodigoCofide, $cboIdu, $ruc_id,$banderaEmpresa);

// TEAM_VIEWER = usuariosa , contraseñaa 
try {

    $anyDesk = $sucursal->editarAcceso($txtIdSucursal, "ANYDESK", $usuario_ANY, $contraseña_ANY, $id_ANY);

    $teamViewer = $sucursal->editarAcceso($txtIdSucursal, "TEAM_VIEWER", $usuariosa, $contraseñaa, $id_TV);

    $escritorioRemoto = $sucursal->editarAcceso($txtIdSucursal, "ESCRITORIO_REMOTO", $usuario_ER, $contraseña_ER, $id_ER);
    
} catch (Exception $e) {
    echo $e;
}

if (!$res) {
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";
