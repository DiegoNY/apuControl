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
        $consulta =   "update grupo as g set nombre = '$nombre', descripcion ='$descripcion', usuarioCreacion = '$usuarioCreacion' where (g.id = '$id');";

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

    //Mostrar Ubigeo

    public function mostrarUbigeo()
    {
        $consulta = "SELECT * FROM `ubigeo`;";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    //CRUD BANDERA
    public function ingresarBandera($logo, $nombre, $ruc)
    {
        $consulta = "INSERT INTO `bandera`(nombre,logo,id_empresa) VALUES('$nombre','$logo','$ruc');";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function  traerBandera($id)
    {
        $consulta = "SELECT * FROM `bandera` as b where(b.id_empresa = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function eliminarBandera($id)
    {
        $consulta = "DELETE  FROM `bandera`  WHERE( id = '$id');";
        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    //Ingresar Bandera Sucursal 

     //CRUD BANDERA
     public function ingresarBanderaSu($logo, $nombre, $idSucursal,$estado)
     {
         $consulta = "INSERT INTO `banderaSucursal`(nombre,bandera,idSucursal,estado) VALUES('$nombre','$logo','$idSucursal','$estado');";
         $res = mysqli_query($this->con, $consulta);
 
         if ($res == TRUE) {
             return TRUE;
         } else {
             return FALSE;
         }

     }
 
     public function  traerBanderaSu()
     {
         $consulta = "SELECT * FROM `banderasucursal` as b where(b.estado = 1);";
         $res = mysqli_query($this->con, $consulta); 
         return $res;
     }

     public function  escucharBanderaSu($id)
     {
         $consulta = "SELECT * FROM `banderasucursal` as b where(b.estado = 1 and b.id = $id);";
         $res = mysqli_query($this->con, $consulta); 
         return $res;
     }
     
     public function editarBandera($id,$nombre,$logo){
        $consulta = "UPDATE `banderaSucursal` AS b SET nombre = '$nombre',bandera= '$logo' WHERE(b.id = $id);";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }     
    }
     public function eliminarBanderaSu($id)
     {
         $consulta = "DELETE  FROM `banderasucursal`  WHERE( id = '$id');";
         $res = mysqli_query($this->con, $consulta);
         if ($res == TRUE) {
             return TRUE;
         } else {
             return FALSE;
         }
     }
 

    //CRUD EMPRESAS
    public function agregarEmpresa($id_grupo, $tipo_persona, $ruc, $razon_social, $nom_comercial, $direccion, $id_ubigeo, $id_rubro, $id_tipo_sistema, $id_tipo_integracion, $tipo_envio, $estado, $fecha_registro, $eliminada, $estado_comercial,$proveedor,$img)
    {
        $validar = mysqli_query($this->con, "SELECT count(*) as total FROM empresa WHERE ruc = '$ruc'");
        $datos = mysqli_fetch_array($validar);

        if ($datos['total'] == 0) {

            $consulta = "insert into `empresa`(id_grupo,tipo_persona,ruc,razon_social,nom_comercial,direccion,id_ubigeo,id_rubro,id_tipo_sistema,id_tipo_integracion,tipo_envio,estado,fecha_registro,eliminada,estado_comercial,proveedor,imglogo) values ('$id_grupo','$tipo_persona','$ruc','$razon_social','$nom_comercial','$direccion','$id_ubigeo','$id_rubro','$id_tipo_sistema','$id_tipo_integracion','$tipo_envio','$estado','$fecha_registro','$eliminada','$estado_comercial','$proveedor','$img');";
            $res = mysqli_query($this->con, $consulta);
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function verEmpresas()
    {
        $consulta = "SELECT * FROM `empresa` AS e WHERE(e.eliminada = 1)";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function verEmpresa($id)
    {
        $consulta = "SELECT * FROM `empresa` as e where (e.eliminada = 1 AND e.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function  editarEmpresas($id, $id_grupo, $tipo_persona, $ruc, $razon_social, $nom_comercial, $direccion, $id_ubigeo, $id_rubro, $id_tipo_sistema, $id_tipo_integracion, $tipo_envio, $estado, $fecha_registro, $estado_comercial,$proveedor)
    {
        $consulta = "update empresa as e set id_grupo = '$id_grupo',tipo_persona = '$tipo_persona',ruc = '$ruc',razon_social = '$razon_social',nom_comercial = '$nom_comercial',direccion ='$direccion',id_ubigeo ='$id_ubigeo',id_rubro = '$id_rubro',id_tipo_sistema = '$id_tipo_sistema',id_tipo_integracion = '$id_tipo_integracion',tipo_envio = '$tipo_envio',estado='$estado',fecha_registro = '$fecha_registro',estado_comercial = '$estado_comercial',proveedor = '$proveedor' where (e.id = '$id');";

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
    public function verContactos($id_empresa)
    {
        $consulta = "SELECT * FROM `contactos` as c where (c.estado = 1 and c.id_empresa = $id_empresa);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function registrarContactos($nombre, $cargo, $id_empresa, $telefono, $correo, $estado,$detalle)
    {
        $consulta = "insert into `contactos`(id_empresa,nombre_contacto,cargo,telefono,correo,estado,detalle) values ('$id_empresa','$nombre','$cargo','$telefono','$correo','$estado','$detalle');";

        $res = mysqli_query($this->con, $consulta);

        if ($res === true) {
            return true;
        } else {
            return false;
        }
    }


    public function eliminarContacto($id)
    {
        $consulta = "update contactos as c set estado = 0 where  c.id = $id";

        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function editarContacto($id, $nombre, $cargo, $id_empresa, $telefono, $correo,$detalle)
    {
        $consulta = "update contactos as c set nombre_contacto = '$nombre', cargo ='$cargo', telefono = '$telefono', correo = '$correo',detalle = '$detalle' where (c.id = '$id' and c.id_empresa = '$id_empresa');";

        $res = mysqli_query($this->con, $consulta);

        if ($res === TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function verContacto($id)
    {
        $consulta = "SELECT * FROM `contactos` as c where (c.estado = 1 and c.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }
    //CRUD SUCURSAL

    public function registrarSucursal($nombre, $direccion, $cod_cofide, $id_ubigeo, $estado, $id_empresa,$codigoApu)
    {
        $cantidadSucursales = mysqli_query($this->con, "SELECT count(*)as total from sucursal as s WHERE(s.id_empresa = '$id_empresa');");
        $data = mysqli_fetch_array($cantidadSucursales);
        $numeroSucursalEmpresa = $data['total']+1;

        $consulta = "insert into `sucursal`(codigo_cofide,nombre,direccion,ubigeo,estado,id_empresa,codigoApu,numerosucursal_empresa) values ('$cod_cofide','$nombre','$direccion','$id_ubigeo','$estado','$id_empresa','$codigoApu','$numeroSucursalEmpresa')";


        $contar_sucursales = mysqli_query($this->con, "SELECT count(*) as total FROM sucursal");
        $cantidad_sucursales = mysqli_fetch_array($contar_sucursales);

     
        $res = mysqli_query($this->con, $consulta);

        return [$res, $cantidad_sucursales['total']];
    }

    public function mostrarSucursales($id)
    {
        $consulta = "SELECT * FROM `sucursal` as s where (s.estado = 1 and s.id_empresa = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function mostrarSucursal($id)
    {
        $consulta = "SELECT * FROM `sucursal` as s where (s.estado = 1 and s.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function eliminarSucursal($id)
    {
        $consulta = "update sucursal as s set estado = 0 where s.id = $id";

        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function editarSucursal($id, $nombre, $direccion, $cod_cofide, $id_ubigeo, $id_empresa)
    {
        $consulta = "update sucursal as s set 
        nombre = '$nombre', codigo_cofide = '$cod_cofide', direccion = '$direccion', ubigeo = '$id_ubigeo' where  (s.id = $id)";

        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    //CRUD Accesos

    public function registrarAccesos($id_sucursal, $nombre, $id_acceso, $contraseña, $estado)
    {
        $consulta = "INSERT INTO `accesos`(id_sucursal,nombreAcceso,idAcceso,contraseña,estado) values ('$id_sucursal','$nombre','$id_acceso','$contraseña','$estado');";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function editarAcceso($id_sucursal, $nombre, $id_acceso, $contraseña, $id)
    {
        $consulta = "UPDATE accesos as a set nombreAcceso = '$nombre',idAcceso = '$id_acceso',contraseña='$contraseña', id_sucursal = '$id_sucursal' where(a.id = $id);";

        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function eliminarAcceso($id)
    {
        $consulta = "UPDATE accesos as a set estado = 0 where (id = $id);";
        $res = mysqli_query($this->con, $consulta);
        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function mostrarAccesos($id)
    {
        $consulta = "SELECT * FROM `accesos` as a where (a.estado = 1 and a.id_sucursal = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public  function mostrarAcceso($id)
    {
        $consulta = "SELECT * FROM `accesos` as a where (a.estado = 1 and a.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    //crud TIPO INTEGRACION 

    public function registrarTipoIntegracion($estado, $nombre, $fecha)
    {

        $consulta = "insert into `tipo_integracion`(nombre,estado,fecha) values ('$nombre','$estado','$fecha');";

        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function mostrarTiposIntegracion()
    {

        $consulta = "SELECT * FROM `tipo_integracion` as tp where (tp.estado = 1);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }
    public function mostrarTipoIntegracion($id)
    {

        $consulta = "SELECT * FROM `tipo_integracion` as tpi where (tpi.estado = 1 and $id = tpi.id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function eliminarTipoIntegracion($id)
    {

        $consulta = "update tipo_integracion as ti set estado = 0 where  ti.id = $id";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function editarTipoIntegracion($id, $nombre)
    {
        $consulta = "update tipo_integracion as ti set nombre = '$nombre' where (ti.id = $id)";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }
    //crud TIPO SISTEMA 

    public function registrarTipoSistema($estado, $nombre, $fecha,$proveedor)
    {

        $consulta = "insert into `tipo_sistema`(nombre,estado,fecha,proveedor) values ('$nombre','$estado','$fecha','$proveedor');";

        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function mostrarTiposSistema()
    {
        $consulta = "SELECT * FROM `tipo_sistema` as ts where (ts.estado = 1);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }
    public function mostrarTipoSistema($id)
    {
        $consulta = "SELECT * FROM `tipo_sistema` as ts where (ts.estado = 1 and $id = ts.id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;
    }

    public function eliminarTipoSistema($id)
    {

        $consulta = "update tipo_sistema as ts set estado = 0 where  ts.id = $id";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function editarTipoSistema($id, $nombre,$proveedor)
    {

        $consulta = "update tipo_sistema as ts set nombre = '$nombre', proveedor = '$proveedor' where (ts.id = $id)";
        $res = mysqli_query($this->con, $consulta);

        if ($res == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    //validando users 

    public function validarUsuarios($usuario, $contraseña)
    {

        $consulta = "SELECT * FROM usuarios where usuario = '$usuario' and contraseña = '$contraseña'";
        $res = mysqli_query($this->con, $consulta);

        if($users = mysqli_fetch_assoc($res)){
            return $users;
        }else{
            return false;
        }

    }

    //RUBRO

    public function  registrarRubro($nombre,$estado,$fecha){

        $consulta = "INSERT INTO `rubro`(nombre,estado,fecha) VALUES ('$nombre','$estado','$fecha');";
        
        $res = mysqli_query($this->con,$consulta);
        

        if($res == TRUE){
            return TRUE;
        }else{
            return FALSE;
        }

    }
    
    public function eliminarRubro($id){

        $consulta = "UPDATE `rubro` AS r SET estado = 0 WHERE(r.id = $id);";
        $res = mysqli_query($this->con,$consulta);
        

        if($res == TRUE){
            return TRUE;
        }else{
            return FALSE;
        }

    }

    public function editarRubro($id,$nombre){

        $consulta = "UPDATE`rubro` as r  SET nombre = '$nombre' WHERE(r.id = $id);";
        
        $res = mysqli_query($this->con,$consulta);
        

        if($res == TRUE){
            return TRUE;
        }else{
            return FALSE;
        }


    }

    public function mostrarRubros(){

        $consulta = "SELECT * FROM rubro AS  r where(r.estado = 1);";
        $res = mysqli_query($this->con, $consulta);
        return $res;

    }

    public function mostrarRubro($id){

        $consulta = "SELECT * FROM rubro AS  r where(r.estado = 1 and r.id = $id);";
        $res = mysqli_query($this->con, $consulta);
        return $res;

    }

    //cargos

    public function mostrarCargos(){

        $consulta = "SELECT * FROM `cargos` AS c WHERE(c.estado = 1);";
        $res= mysqli_query($this->con,$consulta);

        if($res == TRUE){

            return $res;
            die;
        }else{

            return "error";
            die;

        }

    }

    public function mostrarCargo($id){

        $consulta = "SELECT * FROM `cargos` AS c WHERE (c.id = $id);";
        $res= mysqli_query($this->con,$consulta);

        if($res == TRUE){

            return $res;
            

        }else{

            return "error";
            die;

        }

    }

    
    public function registrarCargo($nombre,$fecha,$estado){

        $consulta = "INSERT INTO `cargos` (nombre,fecha,estado) VALUES('$nombre','$fecha','$estado');";
        $res = mysqli_query($this->con, $consulta);

        if($res == TRUE){
            return true;
        }else{
            return false;
        }

    }

    public function eliminarCargo($id){

        $consulta = "UPDATE `cargos` AS c SET estado = 0 WHERE(c.id = $id);";
        
        $res = mysqli_query($this->con, $consulta);

        if($res == TRUE){
            return true;
        }else{
            return false;
        }

    }

    public function editarCargo($id,$nombre){

        $consulta = "UPDATE `cargos` AS c SET nombre = '$nombre' where(c.id = $id);";

        $res = mysqli_query($this->con, $consulta);

        if($res == TRUE){

            return TRUE;
            die;

        }else{

            return FALSE;
            die;
        }
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
