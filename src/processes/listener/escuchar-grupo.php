<?php 
include '../../connection/basedatos.php';
$grupo = new BaseDatos();

$id = $_POST['id'];

$id = $grupo->sanitizar($id);

$resultado = $grupo->verGrupo($id);

if(!$resultado){
    die("Consulta fallida");
}

$json = array();
while($row = mysqli_fetch_array($resultado)){
    $json[] = array(
        'id' => $row['id'],
        'nombre' => $row['nombre'],
        'descripcion' =>$row['descripcion'],
        'estado' => $row['estado'],
        'usuarioCreacion' => $row['usuarioCreacion'],
        'fechaCreacion' => $row['fechaCreacion'],
    );
}

$jsonString = json_encode($json[0]);
echo $jsonString;
?> 