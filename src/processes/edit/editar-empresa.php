<?php

include '../../connection/basedatos.php';
extract($_GET);

$empresa = new BaseDatos();



if (isset($id) and !empty($id) ) {

    $res = $empresa->editarEmpresas($id, $txtIdGrupo ?? "------", $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema, $cboIdTipoIntegracion, $cboTipoEnvio, $cboEstado, $txtFechaRegistro, $txtEstadoComercial);

    if (!$res) {
        die("Consulta fallida llama al admin 😢");
    }

    $json[] = array('mensaje' => "editado", 'ruc' => $txtRuc ) ;
    $jsonString = json_encode($json);
    echo $jsonString;

} else {

    $json[] = array('mensaje' => "faltan datos", 'ruc' => $txtRuc ) ;
    $jsonString = json_encode($json);
    echo $jsonString;
    
}
 