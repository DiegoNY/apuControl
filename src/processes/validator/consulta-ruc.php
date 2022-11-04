<?php

include 'servicio-ruc.php';

extract($_POST);

if (isset($txtRuc) and !empty($txtRuc)) {
    $sunat = new Sunat();

    $data = $sunat->consultaRucSunat($txtRuc);


    $json = array();

    if (TRUE) {
        $json[] = array('mensaje' => "consultando", 'data' => $data);
        $jsonString = json_encode($json);
        echo $jsonString;
    } else {
        echo  "error";
    }
} else {

}
