<?php 

include '../connection/basedatos.php';

$banderas = new BaseDatos();

$resultado = $banderas->traerBanderaSu();

if(!$resultado){
    die("Error");
}


$json = array();

while($row = mysqli_fetch_array($resultado)){

    $json[]= array(
        'id'=>$row['id'],
        'bandera'=>$row['bandera'],
        'nombre'=>$row['nombre']
    );
}

$jsonString = json_encode($json);

echo $jsonString;