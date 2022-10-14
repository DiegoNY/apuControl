<?php 

class BaseDatos{

    private $con;
    private $dbhost = "localhost";
    private $dbuser = "root";
    private $dbpass = "";
    private $dbname = "control_empresas";

    public function __construct()
    {
        $this->conectardb();
    }

    public function sanitizar($var){
        $return  = mysqli_real_escape_string($this->con, $var);
        return $return;
    }

    public function crearGrupo($nombre,$descripcion,$estado,$usuarioCreacion,$fechaCreacion){
        $consulta = "insert into `grupo`(nombre,descripcion,estado,usuarioCreacion,fechaCreacion) values ('$nombre','$descripcion','$estado','$usuarioCreacion','$fechaCreacion');";
        $res = mysqli_query($this->con,$consulta);

        if($res == TRUE ){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    public function verGrupos(){
        $consulta = "SELECT * FROM `grupo` as g where (g.estado = 1);";
        $res = mysqli_query($this->con,$consulta);
        return $res;
    }

    public function conectardb(){
        $this->con = mysqli_connect($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);
			if(mysqli_connect_error()){
				die("Conexión a la base de datos falló " . mysqli_connect_error() . mysqli_connect_errno());
			}
    }

}