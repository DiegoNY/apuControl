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


if ($editarLogodSucursal === "editar") {

    $rutaLogo = $ruta;
} else {

    $rutaLogo = $urlLogos;
}



$sucursal = new BaseDatos();

$res = $sucursal->editarSucursal($txtIdSucursal, $txtNombreSucursal, $txtDireccionSucursal, $txtCodigoCofide, $cboIdub, $ruc_id ?? "", $banderaEmpresa ?? "", $rutaLogo, $codigoApu);


if ($editarAccesoSistema === "registrar") {



    #sistema
    if (!empty($cboIdTipoIntegracion))
        for ($i = 0; $i < count($cboIdTipoIntegracion); $i++) {

            if (empty($idSistema[$i]))
                $sucursal->registrarSistema($txtIdSucursal, $cboTipoSistema[$i], $proveedor[$i], $cboIdTipoIntegracion[$i], 1);
        }

    if (!empty($acceso))
        for ($i = 0; $i < count($acceso); $i++) {
            if (empty($idAcceso[$i]))
                $sucursal->registrarAccesos($txtIdSucursal, $acceso[$i], $usuario[$i], $contaseña[$i] ?? "", 1, $nombreSistema[$i] ?? "");
        }
} else {


    if (!empty($acceso))
        for ($i = 0; $i < count($acceso); $i++) {

            $sucursal->editarAcceso($idAcceso[$i], $txtIdSucursal, $acceso[$i], $usuario[$i], $contaseña[$i], $nombreSistema[$i]);
        }

    if (!empty($cboIdTipoIntegracion))
        for ($i = 0; $i < count($cboIdTipoIntegracion); $i++) {

            $sucursal->EditarSistema($idSistema[$i], $txtIdSucursal, $cboTipoSistema[$i], $proveedor[$i], $cboIdTipoIntegracion[$i]);
        }
}







if (!$res) {
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";
