    <?php

    include '../../connection/basedatos.php';

    //data

    extract($_GET);
    //validacion

    $sistemas = new BaseDatos();


    $res = $sistemas->eliminarSistema( $sistema, $sucursal);

    if (!isset($res)) {

        die('Fallo ... ');

    } else {

        echo "eliminado";
    }
