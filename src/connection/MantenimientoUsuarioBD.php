    <?php
    include 'basedatos.php';


    class MantenimientoUsuarios extends BaseDatos
    {

        public $usuarios;
        public $respuesta;

        public function MostrarUsuarios()
        {
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

        public function EliminarUsuario($id)
        {
            $consulta = "UPDATE `usuarios` AS U SET U.estado = 0 WHERE(U.id = $id);";
            $respuesta = mysqli_query($this->con, $consulta);
            
            return $respuesta;
        }
    }
