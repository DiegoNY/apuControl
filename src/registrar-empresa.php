<?php 
$resulta= extract($_GET);

include 'connection/basedatos.php';

$empresas = new BaseDatos();

$response = $empresas->agregarEmpresa($txtIdGrupo,$cboTipoPersona,$txtRuc,$txtRazonSocial,$txtNombreCo,$txtDireccion,$cboIdu,$cboIdRubro,$cboTipoSistema,$cboIdTipoIntegracion,$cboTipoEnvio,$txtEstado,$txtFechaRegistro,$txtEliminada,$cboEstado);

if ($response == TRUE) {
    $mensaje = "alert-success";
} else {
    $mensaje = "alert-danger";
}

echo $mensaje;




