<?php 
include '../../connection/basedatos.php';

$tipoIntegracionsss = new BaseDatos();

$id = $_POST['id'];

$resultado = $tipoIntegracionsss->mostrarTipoIntegracion($id);

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