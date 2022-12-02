<?php

include '../../connection/basedatos.php';

$nombre = $_POST['txtNombreSucursal'];
$logo = $_FILES['logo']['name'];
$temporal = $_FILES['logo']['tmp_name'];


if (isset($nombre) && !empty($nombre)) {
    $carpeta = './img';
    $ruta = $carpeta . '/' . $logo;
    move_uploaded_file($temporal, "../.$carpeta" . '/' . $logo);

}




extract($_POST);

if(isset($txtNombreSucursal) && !empty($txtNombreSucursal)){

$sucursal = new  BaseDatos();

$txtNombreSucursal = $sucursal->sanitizar($txtNombreSucursal);
$txtDireccionSucursal = $sucursal->sanitizar($txtDireccionSucursal);
$txtEstado = $sucursal->sanitizar($txtEstado);
$txtCodigoCofide = $sucursal->sanitizar($txtCodigoCofide);
$cboIdub = $sucursal->sanitizar($cboIdub);

#retorna cantidad de sucursales y TRUE si se ingreso correctamente 

$resultado = $sucursal->registrarSucursal($txtNombreSucursal,$txtDireccionSucursal,$txtCodigoCofide ?? "",$cboIdub,$txtEstado,$ruc_id_su,$codigoApu ?? "",$banderaEmpresa ?? "",$ruta);

#Se cuentan las sucursales, los accesos estan ligados al id de la sucursal :: 

$cantidad_sucursales   = $resultado[1];
$id_sucursal           = $cantidad_sucursales + 1;

#accesos

if ( empty ( $accesosSucursalPorSistema ) ) {

$anydes =  $sucursal -> registrarAccesos ( $id_sucursal, "TEAMVIEWER", $usuariosa, $contraseñaa, $txtEstado,$proveedor,$cboTipoSistema,$cboIdTipoIntegracion );

$teamvieew = $sucursal -> registrarAccesos ( $id_sucursal, "ANYDESK", $usuario_ANY, $contraseña_ANY, $txtEstado,$proveedor,$cboTipoSistema,$cboIdTipoIntegracion );

$escritortii = $sucursal -> registrarAccesos ( $id_sucursal, "ESCRITORIO_REMOTO", $usuario_ER, $contraseña_ER, $txtEstado,$proveedor,$cboTipoSistema,$cboIdTipoIntegracion );

} else {
    
    #En caso no se de agregar al ultimo sistema se ingresa automaticamente :: {los accesos y sistemas estan misma tabla menos esfuerzo a la BD }

    $anydes =  $sucursal -> registrarAccesos ( $id_sucursal, "TEAMVIEWER", $usuariosa, $contraseñaa, $txtEstado,$proveedor,$cboTipoSistema,$cboIdTipoIntegracion );

    $teamvieew = $sucursal -> registrarAccesos ( $id_sucursal, "ANYDESK", $usuario_ANY, $contraseña_ANY, $txtEstado,$proveedor,$cboTipoSistema,$cboIdTipoIntegracion );

    $escritortii = $sucursal -> registrarAccesos ( $id_sucursal, "ESCRITORIO_REMOTO", $usuario_ER, $contraseña_ER, $txtEstado,$proveedor,$cboTipoSistema,$cboIdTipoIntegracion );

    //$accesosSucursalPorSistema = $_POST['accesosSucursalPorSistema'];
    
    #Tranformandolos en arrays

    $accesosArray = explode("|",$accesosSucursalPorSistema,-1);
    
    $todosLosAccesos = [];

    $laRespuesta = [];

    #se recorren los accesos para obtenerlos por sistema 

    foreach ( $accesosArray as  $accesoSistema ) {

        array_push( $todosLosAccesos ,$accesoSistema );

    } 

    # en este punto @todosLosAccesos[0] = al primer Acceso en String 

    for ($i=0; $i < count($todosLosAccesos) ; $i++) { 
        
       

        # transformando el sistema en un arreglo 
        
        $acceso =  explode(",",$todosLosAccesos[$i],-1);



        ## el primer sistema  no tiene { , } pero los N siguientes si, si se coloca $acceso[0] a los N retornara null 

        if($todosLosAccesos[0] === $todosLosAccesos[$i] ){

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


           
            $sucursal->registrarAccesos($id_sucursal,$anydesk,$usaurioAnyDesk,$contraseñaAnyDesk,1,$proveedor,$tipoSistema,$tipoIntegracon);
            $sucursal->registrarAccesos($id_sucursal,$teamViewer,$usuarioTviewer,$contraseñaTviewer,1,$proveedor,$tipoSistema,$tipoIntegracon);
            $sucursal->registrarAccesos($id_sucursal,$escritorioRemoto,$usuarioEscritorioRemoto,$contraseñaEscritorioRemoto,1,$proveedor,$tipoSistema,$tipoIntegracon);
            
        }else{

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
              
            $sucursal->registrarAccesos($id_sucursal,$anydesk,$usaurioAnyDesk,$contraseñaAnyDesk,1,$proveedor,$tipoSistema,$tipoIntegracon);
            $sucursal->registrarAccesos($id_sucursal,$teamViewer,$usuarioTviewer,$contraseñaTviewer,1,$proveedor,$tipoSistema,$tipoIntegracon);
            $sucursal->registrarAccesos($id_sucursal,$escritorioRemoto,$usuarioEscritorioRemoto,$contraseñaEscritorioRemoto,1,$proveedor,$tipoSistema,$tipoIntegracon);
            

        }
        

    }

   



}


if($resultado == TRUE){
    echo "ingresado"; 
    

}else{
    echo "error";
}

}else{

    echo "sin datos " ;

}   

