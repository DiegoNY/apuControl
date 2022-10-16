<?php 
include 'connection/basedatos.php';

$empresa = new BaseDatos();

$id = $_POST['id'];

$id = $empresa->sanitizar($id);

$resultado = $empresa->verEmpresa($id);

if(!$resultado){
    die("Consulta Fallida");
}

$json = array();

while($row = mysqli_fetch_array($resultado)){
    $json[] = array(
        'id'=>$row['id'],
        'id_grupo' => $row['id_grupo'],
        'tipo_persona'=>$row['tipo_persona'],
        'ruc'=>$row['ruc'],
        'razon_social'=>$row['razon_social'],
        'nom_comercial'=>$row['nom_comercial'],
        'direccion'=>$row['direccion'],
        'id_ubigeo'=>$row['id_ubigeo'],
        'id_rubro'=>$row['id_rubro'],
        'id_tipo_sistema'=>$row['id_tipo_sistema'],
        'id_tipo_integracion'=>$row['id_tipo_integracion'],
        'tipo_envio'=>$row['tipo_envio'],
        'estado'=>$row['estado'],
        'fecha_registro'=>$row['fecha_registro'],
        'estado_comercial'=>$row['estado_comercial'],
    );
}

$jsonString = json_encode($json[0]);
echo $jsonString;

