    <?php

    include '../connection/MantenimientoUsuarioBD.php';

    extract($_POST);


    $usuarios = new MantenimientoUsuarios();

    $accion = $_GET['accion'];

    $respuesta = ["Sin Peticiones"];

    switch ($accion) {
        case "Editar":
            try {
                if (

                    !empty($cargo and isset($cargo))
                    and !empty($idUsuario and isset($idUsuario))
                    and !empty($Contraseña and isset($Contraseña))
                    and !empty($cargo and isset($cargo))

                ) {

                    $res = $usuarios->EditarUsuario(

                        $idUsuario,
                        $usuario,
                        $Contraseña,
                        $cargo

                    );

                    $usuarios->QuitarPermisos($idUsuario);
                    
                    for ($i=0; $i < count($modulos) ; $i++) { 
                        $usuarios->NuevoPermiso($modulos[$i],$idUsuario);
                    }
                    

                    $respuesta = array(
                        'Respuesta' => 'Editado'
                    );

                } else $camposVacios = "no todos los campos estan completos";

            } catch (Exception $e) {

                $Error =  $e->getMessage();
            }

            if (!!$camposVacios || !!$Error)
                $respuesta = array(
                    'Error' => $camposVacios ?? $Error
                );

            break;

        case "Mostrar":

            $usuarios->MostrarUsuarios();

            $todosUsuarios = $usuarios->usuarios;

            $respuesta = array('data' => $todosUsuarios);

            break;

        case "Eliminar":

            try {

                $id = $_GET['id'];
                $usuarios->EliminarUsuario($id);

                $respuesta = array(
                    'Respuesta' => 'Eliminado'
                );
            } catch (Exception $e) {

                $respuesta = array(
                    'Error' =>  $e
                );
            }

            break;

        case "Usuario":


            try {

                $id = $_GET['id'];
                $datos =  $usuarios->DatosUsuario($id);

                $respuesta = array('Usuario' => $datos);

            } catch (\Throwable $th) {

                echo $th;

            }


            break;

        default:
            # code...
            break;
    }





    echo json_encode($respuesta);



