<?php
$resulta = extract($_GET);

include 'connection/basedatos.php';
$empresas = new BaseDatos();

if (isset($txtRuc) and !empty($txtRuc)) {
    $txtIdGrupo = $empresas->sanitizar($txtIdGrupo);
    $cboTipoPersona = $empresas->sanitizar($cboTipoPersona);
    $txtRuc = $empresas->sanitizar($txtRuc);
    $txtRazonSocial = $empresas->sanitizar($txtRazonSocial);
    $txtNombreCo = $empresas->sanitizar($txtNombreCo);
    $txtDireccion = $empresas->sanitizar($txtDireccion);
    $cboIdu = $empresas->sanitizar($cboIdu);
    $cboIdRubro = $empresas->sanitizar($cboIdRubro);
    $cboTipoSistema = $empresas->sanitizar($cboTipoSistema);
    $cboIdTipoIntegracion = $empresas->sanitizar($cboIdTipoIntegracion);
    $cboTipoEnvio = $empresas->sanitizar( $cboTipoEnvio);
    $txtEstado = $empresas->sanitizar($txtEstado);
    $txtFechaRegistro = $empresas->sanitizar($txtFechaRegistro);
    $txtEliminada = $empresas->sanitizar( $txtEliminada);
    $cboEstado = $empresas->sanitizar($cboEstado);


    $response = $empresas->agregarEmpresa($txtIdGrupo, $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema, $cboIdTipoIntegracion, $cboTipoEnvio, $txtEstado, $txtFechaRegistro, $txtEliminada, $cboEstado);
    //se registra una sucursal
    $registroSucursal = $empresas->registrarSucursal($txtNombreCo,$txtDireccion,"----",$cboIdu,$txtEstado,$txtRuc);
    
    $json = array();
    if ($response == TRUE) {
        $json[] = array('mensaje'=>"ingresado",'ruc'=>$txtRuc);
        $jsonString = json_encode($json);
        echo $jsonString;
    } else {
        echo "sin datos";
    }

}else{
    $json[] = array('mensaje'=>"sin datos",'ruc'=>$txtRuc);
    $jsonString = json_encode($json);
    echo $jsonString;
}
