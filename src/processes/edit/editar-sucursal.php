<?php
include '../../connection/basedatos.php';

$nombre = $_POST['txtNombreSucursal'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];
$rutaLogo = "";

if (isset($nombre) && !empty($nombre)) {
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;
    move_uploaded_file($temporal, "../.$carpeta" . '/' . $logo);

}


extract($_POST);


if($editarLogodSucursal === "editar"){

    $rutaLogo = $ruta;
    
}else{

    $rutaLogo = $urlLogos;

}



$sucursal = new BaseDatos();

$res = $sucursal->editarSucursal($txtIdSucursal, $txtNombreSucursal, $txtDireccionSucursal, $txtCodigoCofide, $cboIdub, $ruc_id,$banderaEmpresa,$rutaLogo);

// TEAM_VIEWER = usuariosa , contraseñaa 
try {

    if($editarAccesoSistema == "editar"){



    }else if( $editarAccesoSistema == "registrar") {

    }

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
