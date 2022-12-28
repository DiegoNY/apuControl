    <?php
    include_once '../../connection/basedatos.php';

    session_start();

    $BD = new BaseDatos();

    $usuario =  $_SESSION['id'];
    
    $permiso = $BD->PermisosUsuario($usuario);

    while ($row = mysqli_fetch_array($permiso)) {

        $permisos[] = array(
            'modulo' => $row['id_modulo']
        );
    }

    for ($i = 0; $i < count($permisos); $i++) {

        switch ($permisos[$i]['modulo']) {
            case 1:
                header('Location: ../../views/index.html');
                break;
            case  2:
                header('Location: ../../views/vista-contactos.html');
                break;
            case 3:
                header('Location: ../../views/vista-registro-sistemas.html');
                break;
            case 5:
                header('Location: ../../views/registro-usuarios.html');
                break;
            default:
                break;
        }
    }
