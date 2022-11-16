<?php


include '../../connection/basedatos.php';


extract($_POST);

$banderas = new BaseDatos();


$resultado = $banderas->escucharBanderaSu($id);

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

$jsonString = json_encode($json[0]);

echo $jsonString;