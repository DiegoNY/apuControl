<?php 

include '../connection/basedatos.php';

$ubigeo = new BaseDatos();

$resultado = $ubigeo->mostrarUbigeo();

$json = array();

while($row = mysqli_fetch_array($resultado)){
    $json[] = array(
        'id'=>$row['id'],
        'distrito'=>$row['distrito'],
        'departamento'=>$row['departamento'],
        'provincia'=>$row['provincia'],
        'ubigeo'=>$row['ubigeo'],
    );
}

$jsonStrin = json_encode($json);

echo $jsonStrin;

