<?php
extract($_POST);

include '../../connection/basedatos.php';
$empresas = new BaseDatos();


if (isset($txtRuc) and !empty($txtRuc)|| isset($txtNombreCo) and !empty($txtNombreCo)|| isset($txtRazonSocial) and !empty($txtRazonSocial)||isset($txtDireccion) and !empty($txtDireccion)||isset($txtIdGrupo) and !empty($txtIdGrupo)||isset($cboTipoPersona) and !empty($cboTipoPersona)||isset($cboIdu) and !empty($cboIdu)||isset($cboTipoSistema) and !empty($cboTipoSistema)||isset($cboIdTipoIntegracion) and !empty($cboIdTipoIntegracion)){
   
    $txtIdGrupo = $empresas->sanitizar($txtIdGrupo ?? "----");
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
    $txtFechaRegistro = $empresas->sanitizar($txtFechaRegistro);
    $txtEliminada = $empresas->sanitizar( $txtEliminada);
    $cboEstado = $empresas->sanitizar($cboEstado);
    $txtEstadoComercial= $empresas->sanitizar($txtEstadoComercial);

    $response = $empresas->agregarEmpresa($txtIdGrupo, $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema, $cboIdTipoIntegracion, $cboTipoEnvio, $cboEstado, $txtFechaRegistro, $txtEliminada, $txtEstadoComercial);
    //se registra una sucursal
    $registroSucursal = $empresas->registrarSucursal($txtNombreCo,$txtDireccion,"----",$cboIdu,$txtEliminada,$txtRuc);
    
  
    $json = array();
    if ($response == TRUE) {
        $json[] = array('mensaje'=>"ingresado",'ruc'=>$txtRuc);
        $jsonString = json_encode($json);
        echo $jsonString;
    } else {
        echo "sin datos";
    }

}else{
    
    $json[] = array('mensaje'=>"sin datos");
    $jsonString = json_encode($json);
    echo $jsonString;
}
