<?php 
include '../../connection/basedatos.php';

$tipo = new BaseDatos();


$id = $_POST['id'];

$resultado = $tipo->mostrarTipoSistema($id);


if(!$resultado){
    die('Query Failed');
}

$json = array();
while($row = mysqli_fetch_array($resultado)){

 $json[] = array(
    'id' => $row['id'],
    'nombre' => $row['nombre'],
    'estado' => $row['estado'],
    'fecha' => $row['fecha'],
 );  


}

$jsonString =  json_encode($json[0]);
echo $jsonString;

?>