<?php
include '../../connection/basedatos.php';

$id = $_POST['id'];

$sucursal = new BaseDatos();

$resultado = $sucursal->mostrarSucursal($id);


if(!$resultado){
    die("Query failed");
}

$json = array();

while($row = mysqli_fetch_array($resultado)){
    
    $json[] = array(
        'id'=>$row['id'],
        'codigo_cofide' => $row['codigo_cofide'],
        'nombre'=>$row['nombre'],
        'direccion'=>$row['direccion'],
        'ubigeo'=>$row['ubigeo'],
        'id_empresa'=>$row['id_empresa'],
        'banderaEmpresa'=>$row['bandera'],
        'codigoApu'=>$row['codigoApu'],
        'logo'=>$row['banderasucursal'],
    );
}
$jsonString = json_encode($json[0]);

echo $jsonString;
