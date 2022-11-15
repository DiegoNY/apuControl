<?php

include '../../connection/basedatos.php';

extract($_POST);

if (isset($id) and !empty($id)) {

    $rubro = new BaseDatos();

    $res = $rubro->mostrarRubro($id);

    if (!$res) {
        die(" FALLO ");
    } else {

        $json = array();
        while ($row = mysqli_fetch_array($res)) {
            $json[] = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'fecha' => $row['fecha'],
            );
        }

        $jsonString = json_encode($json[0]);
        echo $jsonString;
    }
}
