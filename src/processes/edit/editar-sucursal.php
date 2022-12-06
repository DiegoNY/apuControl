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

$res = $sucursal->editarSucursal($txtIdSucursal, $txtNombreSucursal, $txtDireccionSucursal, $txtCodigoCofide, $cboIdub, $ruc_id ?? "", $banderaEmpresa ?? "", $rutaLogo);

// TEAM_VIEWER = usuariosa , contraseñaa 
try {

    if ($editarAccesoSistema == "editar") {

        #Tranformandolos en arrays

        $accesosArray = explode("|", $accesosSucursalPorSistema, -1);

        $todosLosAccesos = [];

        $laRespuesta = [];

        #se recorren los accesos para obtenerlos por sistema 

        foreach ($accesosArray as  $accesoSistema) {

            array_push($todosLosAccesos, $accesoSistema);
        }

        # en este punto @todosLosAccesos[0] = al primer Acceso en String 

        for ($i = 0; $i < count($todosLosAccesos); $i++) {



            # transformando el sistema en un arreglo 

            $acceso =  explode(",", $todosLosAccesos[$i], -1);



            ## el primer sistema  no tiene { , } pero los N siguientes si, si se coloca $acceso[0] a los N retornara null 

            if ($todosLosAccesos[0] === $todosLosAccesos[$i]) {

                # se repite por la cantidad de accesos que se tiene, La tabla Accesos registra accesos y sistema estos van entrelasadas

                $tipoIntegracon =  $acceso[0];
                $tipoSistema = $acceso[1];
                $teamViewer = "TEAMVIEWER";
                $usuarioTviewer = $acceso[2];
                $contraseñaTviewer = $acceso[3];
                $anydesk = "ANYDESK";
                $usaurioAnyDesk = $acceso[4];
                $contraseñaAnyDesk = $acceso[5];
                $escritorioRemoto = "ESCRITORIO_REMOTO";
                $usuarioEscritorioRemoto = $acceso[6];
                $contraseñaEscritorioRemoto = $acceso[7];
                $proveedor = $acceso[8];



                $sucursal->editarAcceso($txtIdSucursal, $anydesk, $usaurioAnyDesk, $contraseñaAnyDesk, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->editarAcceso($txtIdSucursal, $teamViewer, $usuarioTviewer, $contraseñaTviewer, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->editarAcceso($txtIdSucursal, $escritorioRemoto, $usuarioEscritorioRemoto, $contraseñaEscritorioRemoto, $proveedor, $tipoSistema, $tipoIntegracon);
            } else {

                $tipoIntegracon =  $acceso[1];
                $tipoSistema = $acceso[2];
                $teamViewer = "TEAMVIEWER";
                $usuarioTviewer = $acceso[3];
                $contraseñaTviewer = $acceso[4];
                $anydesk = "ANYDESK";
                $usaurioAnyDesk = $acceso[5];
                $contraseñaAnyDesk = $acceso[6];
                $escritorioRemoto = "ESCRITORIO_REMOTO";
                $usuarioEscritorioRemoto = $acceso[7];
                $contraseñaEscritorioRemoto = $acceso[8];
                $proveedor = $acceso[9];


                #se repite por la cantidad de accesos que se tiene, La tabla Accesos registra accesos y sistema estos van entrelasados


                $sucursal->editarAcceso($txtIdSucursal, $anydesk, $usaurioAnyDesk, $contraseñaAnyDesk, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->editarAcceso($txtIdSucursal, $teamViewer, $usuarioTviewer, $contraseñaTviewer, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->editarAcceso($txtIdSucursal, $escritorioRemoto, $usuarioEscritorioRemoto, $contraseñaEscritorioRemoto, $proveedor, $tipoSistema, $tipoIntegracon);
            }
        }
    } else if ($editarAccesoSistema == "registrar") {

        #Tranformandolos en arrays

        $accesosArray = explode("|", $accesosSucursalPorSistema, -1);

        $todosLosAccesos = [];

        $laRespuesta = [];

        #se recorren los accesos para obtenerlos por sistema 

        foreach ($accesosArray as  $accesoSistema) {

            array_push($todosLosAccesos, $accesoSistema);
        }

        # en este punto @todosLosAccesos[0] = al primer Acceso en String 

        for ($i = 0; $i < count($todosLosAccesos); $i++) {


            # transformando el sistema en un arreglo 

            $acceso =  explode(",", $todosLosAccesos[$i], -1);

            ## el primer sistema  no tiene { , } pero los N siguientes si, si se coloca $acceso[0] a los N retornara null 

            if ($todosLosAccesos[0] === $todosLosAccesos[$i]) {

                # se repite por la cantidad de accesos que se tiene, La tabla Accesos registra accesos y sistema estos van entrelasadas

                $tipoIntegracon =  $acceso[0];
                $tipoSistema = $acceso[1];
                $teamViewer = "TEAMVIEWER";
                $usuarioTviewer = $acceso[2];
                $contraseñaTviewer = $acceso[3];
                $anydesk = "ANYDESK";
                $usaurioAnyDesk = $acceso[4];
                $contraseñaAnyDesk = $acceso[5];
                $escritorioRemoto = "ESCRITORIO_REMOTO";
                $usuarioEscritorioRemoto = $acceso[6];
                $contraseñaEscritorioRemoto = $acceso[7];
                $proveedor = $acceso[8];



                $sucursal->registrarAccesos($txtIdSucursal, $anydesk, $usaurioAnyDesk, $contraseñaAnyDesk, 1, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->registrarAccesos($txtIdSucursal, $teamViewer, $usuarioTviewer, $contraseñaTviewer, 1, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->registrarAccesos($txtIdSucursal, $escritorioRemoto, $usuarioEscritorioRemoto, $contraseñaEscritorioRemoto, 1, $proveedor, $tipoSistema, $tipoIntegracon);
            } else {

                $tipoIntegracon =  $acceso[1];
                $tipoSistema = $acceso[2];
                $teamViewer = "TEAMVIEWER";
                $usuarioTviewer = $acceso[3];
                $contraseñaTviewer = $acceso[4];
                $anydesk = "ANYDESK";
                $usaurioAnyDesk = $acceso[5];
                $contraseñaAnyDesk = $acceso[6];
                $escritorioRemoto = "ESCRITORIO_REMOTO";
                $usuarioEscritorioRemoto = $acceso[7];
                $contraseñaEscritorioRemoto = $acceso[8];
                $proveedor = $acceso[9];


                #se repite por la cantidad de accesos que se tiene, La tabla Accesos registra accesos y sistema estos van entrelasadas

                $sucursal->registrarAccesos($txtIdSucursal, $anydesk, $usaurioAnyDesk, $contraseñaAnyDesk, 1, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->registrarAccesos($txtIdSucursal, $teamViewer, $usuarioTviewer, $contraseñaTviewer, 1, $proveedor, $tipoSistema, $tipoIntegracon);
                $sucursal->registrarAccesos($txtIdSucursal, $escritorioRemoto, $usuarioEscritorioRemoto, $contraseñaEscritorioRemoto, 1, $proveedor, $tipoSistema, $tipoIntegracon);
            }
        }
    }
} catch (Exception $e) {
    echo $e;
}

if (!$res) {
    die("Consulta fallida llama al admin 😢");
}

echo "ingresado";
