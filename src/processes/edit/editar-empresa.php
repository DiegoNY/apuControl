<?php

include '../../connection/basedatos.php';


$ruc = $_POST['txtRuc'];
$nombre = $_POST['txtRazonSocial'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];
$rutaLogo = "";


if (isset($nombre) && !empty($nombre)) {
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;
    move_uploaded_file($temporal, "../.$carpeta" . '/' . $logo);

    $bandera = new BaseDatos();
    $res =  $bandera->ingresarBandera($ruta, $nombre, $ruc);
}


extract($_POST);

$empresa = new BaseDatos();



if (isset($id) and !empty($id) ) {


    if($editarLogo === "editar"){

        $rutaLogo = $ruta;
        
    }else{
    
        $rutaLogo = $urlLogo;
    
    }

    $res = $empresa->editarEmpresas($id, $txtIdGrupo ?? "------", $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema ?? "", $cboIdTipoIntegracion ?? "", $cboTipoEnvio, $cboEstado, $txtFechaRegistro, $txtEstadoComercial,$proveedor??"",$rutaLogo,$contraseñaClaveSol,$usuarioClaveSol);

    if (!$res) {
        die("Consulta fallida llama al admin 😢");
    }

    $json[] = array('mensaje' => "ingresado", 'ruc' => $txtRuc ) ;
    $jsonString = json_encode($json);
    echo $jsonString;

}else if(isset($txtRuc) and !empty($txtRuc)){

    
    if($editarLogo === "editar"){

        $rutaLogo = $ruta;
        
    }else{
    
        $rutaLogo = $urlLogo;
    
    }

    $res = $empresa->editarEmpresasAlIngresar($txtIdGrupo ?? "------", $cboTipoPersona, $txtRuc, $txtRazonSocial, $txtNombreCo, $txtDireccion, $cboIdu, $cboIdRubro, $cboTipoSistema, $cboIdTipoIntegracion, $cboTipoEnvio, $cboEstado, $txtFechaRegistro, $txtEstadoComercial,$proveedor,$rutaLogo);

    if (!$res) {
        die("Consulta fallida llama al admin 😢");
    }

    $json[] = array('mensaje' => "ingresoempresa", 'ruc' => $txtRuc ) ;
    $jsonString = json_encode($json);
    echo $jsonString;


} else {

    $json[] = array('mensaje' => "faltan datos", 'ruc' => $txtRuc ) ;
    $jsonString = json_encode($json);
    echo $jsonString;
    
}
 