    <?php
    include 'basedatos.php';
    include './ValidacionUsuario.php';

    class MantenimientoUsuarios extends BaseDatos
    {

        public $usuarios;
        public $respuesta;

        public function MostrarUsuarios()
        {

            # $consulta = "SELECT c.id, c.id_empresa, e.razon_social, c.nombre_contacto, c.cargo, c.telefono, c.correo FROM `contactos` as c JOIN `empresa` e ON c.id_empresa = e.ruc where (c.estado = 1);";


            $consulta = "SELECT * FROM  `usuarios` AS U WHERE(U.estado = 1);";
            $resultado = mysqli_query($this->con, $consulta);

            while ($row = mysqli_fetch_array($resultado)) {


                $respuesta[] = array(
                    'id' => $row['id'],
                    'usuario' => $row['usuario'],
                    'contraseña' => $row['contraseña'],
                    'cargo' => $row['cargo'],
                );
            }

            $this->usuarios = $respuesta;
        }


        public function EditarUsuario($id, $usuario, $contraseña, $cargo)
        {
            $consulta = "UPDATE `usuarios` AS U SET U.usuario = '$usuario',U.contraseña = '$contraseña' , U.cargo =  '$cargo' WHERE(U.id = $id);";
            $respuesta = mysqli_query($this->con, $consulta);

            return $respuesta;
        }

        public function QuitarPermisos($usuario)
        {
            $consulta = "DELETE FROM `permisos` WHERE ( id_usuario = $usuario);";
            $respuesta = mysqli_query($this->con, $consulta);

            return $respuesta;
        }

        public function NuevoPermiso($modulo, $usuario)
        {
            $consulta = "INSERT INTO `permisos` (id_modulo,id_usuario) VALUES ('$modulo','$usuario')";
            $respuesta = mysqli_query($this->con, $consulta);

            return $respuesta;
        }



        public function EliminarUsuario($id)
        {
            $consulta = "UPDATE `usuarios` AS U SET U.estado = 0 WHERE(U.id = $id);";
            $respuesta = mysqli_query($this->con, $consulta);

            return $respuesta;
        }

        public function DatosUsuario($id)
        {

            $usuario = "SELECT * FROM `usuarios` AS U WHERE (U.id = $id);";

            $permisos = "SELECT * FROM `permisos` AS P WHERE (P.id_usuario = $id);";

            $respuesta1 = mysqli_query($this->con, $usuario);

            $respuesta2 = mysqli_query($this->con, $permisos);

            $permisos = array();

            while ($datos = mysqli_fetch_array($respuesta1)) {

                while ($modulos = mysqli_fetch_array($respuesta2)) {
                    $permisos[] = $modulos['id_modulo'];
                }

                $respuesta[] = array(

                    'id' => $datos['id'],
                    'usuario' => $datos['usuario'],
                    'contraseña' => $datos['contraseña'],
                    'cargo' => $datos['cargo'],
                    'permisos' => $permisos,

                );
            }

            return $respuesta;
        }
    }
