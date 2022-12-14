<?php

// se valida la sesion esta se genera en los cookies 

session_start();

$ses = $_SESSION['usuario'];
$cargo = $_SESSION['cargo'];

echo json_encode( array('usuario' => array($ses,$cargo) ));
