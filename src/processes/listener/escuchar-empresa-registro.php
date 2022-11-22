<?php
include '../../connection/basedatos.php';

$empresa = new BaseDatos();

$id = $_POST['id'] ?? null;
$jsons = array();

if (!isset($id)) { 
        $jsons[] = array('mensaje'=>"Sin Datos aun",'id'=> $id);
        $jsonStrings = json_encode($jsons[0]);
        echo $jsonStrings;
} else {
    $id = $empresa->sanitizar($id);

    $resultado = $empresa->verEmpresaRegistrar($id);

    $json = array();

    while ($row = mysqli_fetch_array($resultado)) {
        $json[] = array(
            'id' => $row['id'],
            'id_grupo' => $row['id_grupo'],
            'tipo_persona' => $row['tipo_persona'],
            'ruc' => $row['ruc'],
            'razon_social' => $row['razon_social'],
            'nom_comercial' => $row['nom_comercial'],
            'direccion' => $row['direccion'],
            'id_ubigeo' => $row['id_ubigeo'],
            'id_rubro' => $row['id_rubro'],
            'id_tipo_sistema' => $row['id_tipo_sistema'],
            'id_tipo_integracion' => $row['id_tipo_integracion'],
            'tipo_envio' => $row['tipo_envio'],
            'estado' => $row['estado'],
            'fecha_registro' => $row['fecha_registro'],
            'estado_comercial' => $row['estado_comercial'],
            'proveedor' => $row['proveedor'],
            'img' => $row['imglogo'],
        );
    }

    $jsonString = json_encode($json[0]);
    echo $jsonString;
}
