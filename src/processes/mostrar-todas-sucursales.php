<?php
include '../connection/basedatos.php';


//solo probando 
extract($_GET);

$sucursal = new BaseDatos();



    $resultado = $sucursal->mostrarTodasSucursales();

    if(!$resultado){
        die("Query failed");
    }

    $json = array();

    while($row = mysqli_fetch_array($resultado)){
        
        $json['data'][] = array(
            'id'=>$row['id'],
            'codigo_cofide' => $row['codigo_cofide'],
            'nombre'=>$row['nombre'],
            'direccion'=>$row['direccion'],
            'ubigeo'=>$row['ubigeo'],
            'id_empresa'=>$row['id_empresa'],
            'numeroSucursalEmpresa'=>$row['numerosucursal_empresa'],
        );
    }
    


$jsonString = json_encode($json);

echo $jsonString;