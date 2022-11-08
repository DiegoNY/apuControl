<?php

include '../../connection/basedatos.php';



class Accesos{

    public function registrarAccesoss($txtIdSucursal, $txtNombreAcceso, $txtIdAcceso, $txtContraseña, $txtEstado){
    
     $accesos = new BaseDatos();
     $resultado = $accesos->registrarAccesos($txtIdSucursal, $txtNombreAcceso, $txtIdAcceso, $txtContraseña, $txtEstado);


    if ($resultado == TRUE) {
        return "ingresado";
    } else {
        return "error";
    }
    }


}
   
