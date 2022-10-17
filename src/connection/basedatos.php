<?php

class BaseDatos
{

    private $con;
    private $dbhost = "localhost";
    private $dbuser = "root";
    private $dbpass = "";
    private $dbname = "control_empresas";

    public function __construct()
    {
        $this->conectardb();
    }


    public function sanitizar($var)
    {
        $return  = mysqli_real_escape_string($this->con, $var);
        return $return;
    }

    //CRUD GRUPOS :
    public function editarGrupo($id, $nombre, $descripcion, $usuarioCreacion)
    {
        $consulta = "update grupo as g set nombre = '$nombre', descripcion ='$descripcion', usuarioCreacion = '$usuarioCreacion' where (g.id = '$id');";

        $res = mysqli_query($this->con, $consulta);

        if ($res === TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function verGrupo($id)
    {
        $consulta = "SELECT * FROM `grupo` as g where (g.estado = 1 and g.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function eliminarGrupo($id)
    {
        $consulta = "update grupo as g set estado = 0 where  g.id = $id";
        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function crearGrupo($nombre, $descripcion, $estado, $usuarioCreacion, $fechaCreacion)
    {
        $consulta = "insert into `grupo`(nombre,descripcion,estado,usuarioCreacion,fechaCreacion) values ('$nombre','$descripcion','$estado','$usuarioCreacion','$fechaCreacion');";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }


    public function verGrupos()
    {
        $consulta = "SELECT * FROM `grupo` as g where (g.estado = 1);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    //CRUD RUBRO

    //CRUD BANDERA

    //CRUD EMPRESAS
    public function agregarEmpresa($id_grupo, $tipo_persona, $ruc, $razon_social, $nom_comercial, $direccion, $id_ubigeo, $id_rubro, $id_tipo_sistema, $id_tipo_integracion, $tipo_envio, $estado, $fecha_registro, $eliminada, $estado_comercial)
    {
        $consulta = "insert into `empresa`(id_grupo,tipo_persona,ruc,razon_social,nom_comercial,direccion,id_ubigeo,id_rubro,id_tipo_sistema,id_tipo_integracion,tipo_envio,estado,fecha_registro,eliminada,estado_comercial) values ('$id_grupo','$tipo_persona','$ruc','$razon_social','$nom_comercial','$direccion','$id_ubigeo','$id_rubro','$id_tipo_sistema','$id_tipo_integracion','$tipo_envio','$estado','$fecha_registro','$eliminada',$estado_comercial);";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function verEmpresas()
    {
        $consulta = "SELECT * FROM `empresa` as e where (e.eliminada = 1);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function verEmpresa($id)
    {
        $consulta = "SELECT * FROM `empresa` as e where (e.eliminada = 1 AND e.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function  editarEmpresas($id, $id_grupo, $tipo_persona, $ruc, $razon_social, $nom_comercial, $direccion, $id_ubigeo, $id_rubro, $id_tipo_sistema, $id_tipo_integracion, $tipo_envio, $estado, $fecha_registro, $estado_comercial)
    {
        $consulta = "update empresa as e set id_grupo = '$id_grupo',tipo_persona = '$tipo_persona',ruc = '$ruc',razon_social = '$razon_social',nom_comercial = '$nom_comercial',direccion ='$direccion',id_ubigeo ='$id_ubigeo',id_rubro = '$id_rubro',id_tipo_sistema = '$id_tipo_sistema',id_tipo_integracion = '$id_tipo_integracion',tipo_envio = '$tipo_envio',estado='$estado',fecha_registro = '$fecha_registro',estado_comercial = '$estado_comercial' where (e.id = '$id');";

        $res = mysqli_query($this->con, $consulta);

        if ($res === TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function borrarEmpresas($id)
    {
        $consulta = "update empresa as e set eliminada = 0 where  e.id = $id";
        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    //CRUD CONTACTOS 
    public function verContactos(){
        $consulta = "SELECT * FROM `contactos` as c where (c.estado = 1);";
        $res = mysqli_query($this->con, $consulta);
        return $res;

    }

    public function registrarContactos($nombre,$cargo,$id_empresa,$telefono,$correo,$estado){
        $consulta = "insert into `contactos`(id_empresa,nombre_contacto,cargo,telefono,correo,estado) values ('$id_empresa','$nombre','$cargo','$telefono','$correo','$estado');";
        
        $res = mysqli_query($this->con, $consulta);
        
        if($res === true){
            return true;
        }else{
            return false;
        }
    }


    public function eliminarContacto($id){
        $consulta = "update contactos as c set estado = 0 where  c.id = $id";

        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function editarContacto($id,$nombre,$cargo,$id_empresa,$telefono,$correo){
        $consulta = "update contactos as c set nombre_contacto = '$nombre', cargo ='$cargo', telefono = '$telefono', correo = '$correo' where (c.id = '$id' and c.id_empresa = '$id_empresa');";

        $res = mysqli_query($this->con, $consulta);

        if ($res === TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function verContacto($id){
        $consulta = "SELECT * FROM `contactos` as c where (c.estado = 1 and c.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }
    //CRUD SUCURSAL

    public function registrarSucursal($nombre,$direccion,$cod_cofide,$id_ubigeo,$estado,$id_empresa){
        $consulta = "insert into `sucursal`(codigo_cofide,nombre,direccion,ubigeo,estado,id_empresa) values ('$cod_cofide','$nombre','$direccion','$id_ubigeo','$estado','$id_empresa')";

        $res = mysqli_query($this->con,$consulta);

        return $res;
    }

    public function mostrarSucursales(){

    }

    public function mostrarSucursal(){

    }

    public function eliminarSucursal(){

    }

    public function editarSucursal(){
        
    }

    //conectar la BD
    public function conectardb()
    {
        $this->con = mysqli_connect($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);
        if (mysqli_connect_error()) {
            die("Conexión a la base de datos falló " . mysqli_connect_error() . mysqli_connect_errno());
        }
    }
}
