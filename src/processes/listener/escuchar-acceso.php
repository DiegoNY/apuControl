<?php 

include '../../connection/basedatos.php';

$accesos = new BaseDatos();

$id = $_POST['id'];

$resultado = $accesos->mostrarAcceso($id);


if(!$resultado){
    die("Query failed");
}

$json = array();

while($row = mysqli_fetch_array($resultado)){
    
    $json[] = array(
        'id'=>$row['id'],
        'id_sucursal' => $row['id_sucursal'],
        'nombreAcceso'=>$row['nombreAcceso'],
        'idAcceso'=>$row['idAcceso'],
        'contrasena'=>$row['contraseña'],
    );
}
$jsonString = json_encode($json[0]);

echo $jsonString;