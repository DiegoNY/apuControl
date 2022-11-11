<?php

// se valida la sesion esta se genera en los cookies 

session_start();

$ses = $_SESSION['usuario'];

echo json_encode( array('usuario' => array($ses)));
