<?php

include '../../connection/basedatos.php';
extract($_POST);

$empresa = new BaseDatos();

if (!isset($id)) {
    echo "id vacio";
} else {

    $res = $empresa->editarEmpresas($id, $txtIdGrupo ?? "------", $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema, $cboIdTipoIntegracion, $cboTipoEnvio, $cboEstado, $txtFechaRegistro, $txtEstadoComercial);

    if (!$res) {
        die("Consulta fallida llama al admin 😢");
    }

    $json[] = array('mensaje' => "editado", 'ruc' => $txtRuc ) ;
    $jsonString = json_encode($json);
    echo $jsonString;
}
 