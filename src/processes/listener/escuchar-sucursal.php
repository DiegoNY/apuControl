<?php
include '../../connection/basedatos.php';

$id = $_POST['id'];

$sucursal = new BaseDatos();

$tiposSistemas = $sucursal->mostrarTiposSistema();
$resultado = $sucursal->mostrarSucursal($id);
$acceso = $sucursal->mostrarAccesos($id);
$sistemas = $sucursal->MostrarSistema($id);
$integraciones = $sucursal->mostrarTiposIntegracion();

while ($intTip = mysqli_fetch_array($integraciones)){

    $tipoIntegracion[] = array(

        'nombre' => $intTip['nombre']

    );

}

while ( $tipS = mysqli_fetch_array($tiposSistemas)){
    
    $tpsistemas[] = array(
        'nombre' => $tipS['nombre']
    );

}

while ($acces = mysqli_fetch_array($acceso)) {

    $accesosSucursal[] = array(

        "id" =>  $acces['id'],
        "accesos" =>  $acces['nombreAcceso'],
        "usuario" => $acces['idAcceso'],
        "contraseña" =>  $acces['contraseña'],
        "nombreSistema" =>  $acces['nombresistema'],

    );
}

while ($sistem = mysqli_fetch_array($sistemas)) {
    $sist[] = array(

        "id" => $sistem['id'],
        "nombre" => $sistem['nombre'],
        "integracion" => $sistem['integracion'],
        "proveedor" => $sistem['proveedor']

    );
}

if (!$resultado) {

    die("Query failed");
}

$json = array();

while ($row = mysqli_fetch_array($resultado)) {

    $json[] = array(

        'id' => $row['id'],
        'codigo_cofide' => $row['codigo_cofide'],
        'nombre' => $row['nombre'],
        'direccion' => $row['direccion'],
        'ubigeo' => $row['ubigeo'],
        'id_empresa' => $row['id_empresa'],
        'banderaEmpresa' => $row['bandera'],
        'codigoApu' => $row['codigoApu'],
        'logo' => $row['banderasucursal'],
        'sistemas' => $sist ?? [array("proveedor"=>"")],
        'accesos' => $accesosSucursal ?? [array("contraseña"=>"","usuario"=>"")],
        'tiposSistemas' => $tpsistemas,
        'tiposIntegracion' => $tipoIntegracion,
        

    );
}
$jsonString = json_encode($json[0]);

echo $jsonString;
