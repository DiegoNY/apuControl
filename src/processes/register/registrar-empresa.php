<?php
include '../../connection/basedatos.php';

$ruc = $_POST['txtRuc'];
$nombre = $_POST['txtRazonSocial'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];


if (isset($nombre) && !empty($nombre)) {
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;
    move_uploaded_file($temporal, "../.$carpeta" . '/' . $logo);

    $bandera = new BaseDatos();
    $res =  $bandera->ingresarBandera($ruta, $nombre, $ruc);
}


extract($_POST);


$empresas = new BaseDatos();


if (!empty($txtRuc) || !empty($txtNombreCo) || !empty($txtRazonSocial) || !empty($txtDireccion) || isset($cboTipoPersona) and !empty($cboTipoPersona) || isset($cboIdRubro) and !empty($cboIdRubro)) {

    $txtIdGrupo = $empresas->sanitizar($txtIdGrupo ?? "----");
    $cboTipoPersona = $empresas->sanitizar($cboTipoPersona);
    $txtRuc = $empresas->sanitizar($txtRuc);
    $txtRazonSocial = $empresas->sanitizar($txtRazonSocial);
    $txtNombreCo = $empresas->sanitizar($txtNombreCo);
    $txtDireccion = $empresas->sanitizar($txtDireccion);
    $cboIdu = $empresas->sanitizar($cboIdu);
    $cboIdRubro = $empresas->sanitizar($cboIdRubro);
    //$cboTipoSistema = $empresas->sanitizar($cboTipoSistema);
    //$cboIdTipoIntegracion = $empresas->sanitizar($cboIdTipoIntegracion);
    $cboTipoEnvio = $empresas->sanitizar($cboTipoEnvio);
    $txtFechaRegistro = $empresas->sanitizar($txtFechaRegistro);
    $txtEliminada = $empresas->sanitizar($txtEliminada);
    $cboEstado = $empresas->sanitizar($cboEstado);
    $txtEstadoComercial = $empresas->sanitizar($txtEstadoComercial);
    $response = $empresas->agregarEmpresa($txtIdGrupo, $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema ?? "", $cboIdTipoIntegracion ?? "", $cboTipoEnvio, $cboEstado, $txtFechaRegistro, $txtEliminada, $txtEstadoComercial,$proveedor ?? "",$ruta?? "",$usuarioClaveSol,$contraseñaClaveSol);


    $json = array();
    if ($response == TRUE) {

        $registroSucursal = $empresas->registrarSucursal($txtNombreCo, $txtDireccion, " ", $cboIdu, $txtEliminada, $txtRuc," "," "," ");

        $id_sucursal= $registroSucursal[1] + 1;

        // $anydes = $empresas->registrarAccesos($id_sucursal, "TEAM_VIEWER", $usuariosa ?? "", $contraseñaa ?? "", $txtEstado,"","","");
        // $teamvieew = $empresas->registrarAccesos($id_sucursal, "ANY_DESK", $usuario_ANY ?? "", $contraseña_ANY ?? "", $txtEstado,"","","");
        // $escritortii = $empresas->registrarAccesos($id_sucursal, "ESCRITORIO_REMOTO", $usuario_ER ?? "", $contraseña_ER ?? "", $txtEstado,"","","");

        $json[] = array('mensaje' => "ingresoempresa", 'ruc' => $txtRuc);
        $jsonString = json_encode($json);
        echo $jsonString;

    } else {

        $json[] = array('mensaje' => "existe",'ruc' => $txtRuc);
        $jsonString = json_encode($json);
        echo $jsonString;
    
    }
} else {

    $json[] = array('mensaje' => "sin datos");
    $jsonString = json_encode($json);
    echo $jsonString;
}
