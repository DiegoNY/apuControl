<?php
$fecha = date('y/m/d');

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Document</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!-- DataTable -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
    <!-- Stylos -->
    <link rel="stylesheet" href="../style/style.css">
    <!---TABS LINKS -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!-- TABS -->
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <!-- fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap" rel="stylesheet">

    <!-- icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">


</head>

<body id="body">
    <!-- Prueba index -->
    <header>
        <div class="container-fluid ">
            <nav class="navbar navbar-expand-lg navbar-light  py-4">
                <div class="container-fluid">
                    <a class="navbar-brand text-light" href="">APC</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="empresas.html">VER EMPRESAS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="login.php">SALIR</a>
                            </li>

                            <li class="nav-item inactive">
                                <a class="nav-link" href="#">volver</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">🐱‍👤</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <main>

        <div class="contenedor ">
            <div class="frm-tabla-empresa">
                <div class="frm">
                    <form id="frm_empresa" class="frm-empresa">
                        <input type="hidden" id="id" name="id">
                        <div class="nombre  cont-form">
                            <label for="txtNombreCo"> Nombre</label>
                            <input type="text" value="" name="txtNombreCo" id="txtNombreCo">
                        </div>


                        <div class="cbo-id cont-form">
                            <label for="cboIdGrupo">Grupo</label>
                            <select id="cbogrupo" name="txtIdGrupo">
                                <option value="value">value</option>
                            </select>
                        </div>

                        <div class="ruc cont-form">
                            <label for="txtRuc"> Ruc</label>
                            <input type="text" value="" name="txtRuc" id="txtRuc">
                        </div>

                        <div class="razon-social cont-form">
                            <label for="txtRazonSocial">Razon social</label>
                            <input type="text" value="" name="txtRazonSocial" id="txtRazonSocial">
                        </div>

                        <div class="direccion cont-form">
                            <label for="txtDireccion">Direccion</label>
                            <input type="text" value="" name="txtDireccion" id="txtDireccion">
                        </div>

                        <div class="tipo-sis cont-form">

                            <label for="cboTipoSistema">Tipo de sistema</label>
                            <select name="cboTipoSistema" id="cboTipoSistema">
                                <option value="GESFARMA">GESFARMA</option>
                                <option value="APUGESCOM">APUGESCOM</option>
                            </select>
                        </div>

                        <div class="bdo-id cont-form">
                            <label for="cboIdRubro">Rubro</label>
                            <select name="cboIdRubro" id="cboIdRubro">
                                <option value="EDS">EDS</option>
                                <option value="BOTICAS" selected>BOTICAS</option>
                                <option value="MARKETS">MARKETS</option>
                            </select>
                        </div>

                        <div class="cbo-ti cont-form">
                            <label for="cboTipoEnvio">Tipo de envio</label>
                            <select name="cboTipoEnvio" id="cboTipoEnvio">
                                <option value="OSE">OSE</option>
                                <option value="SUNAT" selected>SUNAT</option>
                            </select>
                        </div>
                        <div class="cbo-id-tip-inte cont-form">
                            <label for="cboIdTipoIntegracion">Tipo de integracion</label>
                            <select name="cboIdTipoIntegracion" id="cboIdTipoIntegracion">
                                <option value="DBF">DBF</option>
                                <option value="TXT" selected>TXT</option>
                                <option value="JSON">JSON</option>
                            </select>
                        </div>
                        <div class="inactive">

                            <input type="hidden" name="txtFechaRegistro" id="txtFechaRegistro" value="<?php echo $fecha ?>">
                        </div>
                        <div class="cont-form">
                            <label for="txtEstadoComercial">Estado comercial</label>
                            <select name="txtEstadoComercial" id="txtEstadoComercial">
                                <option value="INGRESADO">INGRESADO</option>
                                <option value="POR_INSTALAR">POR INSTALAR</option>
                                <option value="PRODUCCION">PRODUCCION</option>
                            </select>
                        </div>
                        <div class="cont-form">
                            <label for="cboTipoPersona">Tipo de persona</label>
                            <select name="cboTipoPersona" id="cboTipoPersona">
                                <option value="NATURAL">Natural</option>
                                <option value="JURIDICA" selected>Juridica</option>
                            </select>
                        </div>
                        <div class="cont-form">
                            <label for="cboIdu ">Distrito</label>
                            <select name="cboIdu" id="cboIdu">
                                <option value="123">123</option>
                                <option value="164" selected>164</option>
                            </select>
                        </div>
                        <div class="cont-form">
                            <label for="cboEstado">Estado</label>
                            <select name="cboEstado" id="cboEstado">
                                <option value="POSIBLE_CLIENTE">Posible Cliente</option>
                                <option value="CLIENTE" selected>Cliente</option>
                            </select>
                        </div>

                        <div class="cont-form">

                            <label for="">Bandera</label>
                            <div class="conteiner">
                                 <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Bandera 
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <label for="" id="txtbander"></label>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                            </div>
                           

                        </div>

                        <div>
                            <input type="hidden" value="1" name="txtEstado">
                            <input type="hidden" value="1" name="txtEliminada">
                        </div>
                        <input type="button" onclick="RegistrarEmpresa()" value="Ingresar Empresa" class="btn-tabla-empresa">
                    </form>
                </div>

                <div id="tabs" class="tabs">
                <input type="hidden" value="1" name="ruc_id" id="ruc_id">
                    <ul class="nav nav-tabs">
                        <li class="nav-item inactive">
                            <a class="nav-link active" aria-current="page" href="#tabs-1">Grupos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#tabs-2">Sucursal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#tabs-3">Contactos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#tabs-4">Accesos</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link active" href="#tabs-5">Logo</a>
                        </li>
                    </ul>

                    <div id="tabs-1" class="inactive">

                        <div class="contenedor">

                            <div class="contenedor contenedor-tabla">
                                <div class="frm">
                                    <form id="frm_grupo" name="frm_grupo" class=" frm-grupo">
                                        <input type="hidden" name="txtIdGrupo" id="id_grupo">
                                        <div>
                                            <label for="txtNombre">Nombre Grupo :</label>
                                            <input type="hidden" name="txtFuncion" id="txtFuncion" value="Insertar">
                                            <input type="text" name="txtNombre" id="txtNombre">
                                        </div>
                                        <div class="grupo-descripcion">
                                            <label for="txtDescripcion">Descripcion :</label>
                                            <input type="text" name="txtDescripcion" id="txtDescripcion" class="descripcion">
                                        </div>
                                        <div class="inactive">
                                            <input type="hidden" value="1" name="txtEstado" id="txtEstado">
                                        </div>
                                        <div>
                                            <label for="txtUsuCre">Usuario Creacion :</label>
                                            <input type="text" name="txtUsuCre" id="txtUsuCre">
                                        </div>
                                        <div class="inactive">
                                            <input type="hidden" name="txtFechCre" id="txtFechCre" value="<?php echo $fecha; ?>">
                                        </div>

                                        <input type="button" onclick="RegistrarGrupo()" value="Ingresar Grupo" class="btn-ingresar-grupo">
                                    </form>
                                </div>


                                <div class="tabla-grupo ">
                                    <div class="tablas-empresa  table-responsive conteiner-fluid" id="tabla">
                                        <table id="tabla-grupos" class="table table-borderless  table-hover" style="width:100%; ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">NOMBRE</th>
                                                    <th scope="col">DESCRIPCION </th>
                                                    <th scope="col">FECHA-CREACION </th>
                                                    <th scope="col">USUARIO-CREACION</th>
                                                    <th scope="col">EDITAR</th>
                                                    <th scope="col">ELIMINAR</th>
                                                </tr>
                                            </thead>
                                            <tbody id="listado-grupos">
                                                <!-- Data en Ajax-->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="tabs-2">
                        <div class="contenedor  contenedor-tabla">
                            <div class="frm">
                                <form id="frm-sucursal" class="frm-sucursal">
                                    <input type="hidden" id="id-sucursal" name="id_sucursal">
                                    <div>
                                        <label for="txtNombreSucursal">Nombre</label>
                                        <input type="text" name="txtNombreSucursal" id="txtNombreSucursal">
                                    </div>
                                    <div>
                                        <label for="txtDireccionSucursal">Direccion</label>
                                        <input type="text" name="txtDireccionSucursal" id="txtDireccionSucursal">
                                    </div>
                                    <div>
                                        <label for="txtCodigoCofide">Codigo Cofide</label>
                                        <input type="text" name="txtCodigoCofide" id="txtCodigoCofide">
                                    </div>
                                    <div>
                                        <label for="cboIdu ">Distrito</label>
                                        <select name="cboIdu" id="cboIdub">
                                            <option value="123">123</option>
                                            <option value="164" selected>164</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="txtIdEmpresa">Id Empresa</label>
                                        <input type="text" name="txtIdEmpresa" id="txtIdEmpresa">
                                    </div>
                                    <input type="hidden" value="1" name="txtEstado">
                                    <input type="button" value="Registrar" onclick="registrarSucursal();" class="btn-sucursal">
                                </form>
                            </div>

                            <div class="tabla-sucursal">
                                <div class="tablas-sucursal table-responsive" id="tabla">
                                    <table id="tabla_sucursals" class="table  table-hover display" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Ruc</th>
                                                <th>Nombre</th>
                                                <th>Cod_Cofide</th>
                                                <th>Direccion</th>
                                                <th>Ubigeo</th>
                                                <th>Opciones</th>
                                                <th>Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listado-sucursal">
                                            <!-- Data en Ajax-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="tabs-3">
                        <div class="frm-tabla-contactos contenedor contenedor-tabla">
                            <div class="frm">
                                <form id="frm-contactos" class="frm-contactos">
                                    <input type="hidden" id="id-contacto" name="id_contacto">
                                    <div>
                                        <label for="txtNombre">Nombre</label>
                                        <input type="text" name="txtNombre" id="nombre-contacto">
                                    </div>
                                    <div>
                                        <label for="txtCargo">Cargo</label>
                                        <input type="text" name="txtCargo" id="cargo-contacto">
                                    </div>
                                    <div>
                                        <label for="txtEmpresa">RUC Empresa</label>
                                        <input type="text" name="txtEmpresa" id="id-empresa-contacto">
                                    </div>
                                    <div>
                                        <label for="txtTelefono">Telefono</label>
                                        <input type="text" name="txtTelefono" id="telefono-contacto">
                                    </div>
                                    <div>
                                        <label for="txtCorreo">Correo</label>
                                        <input type="text" name="txtCorreo" id="correo-contacto">
                                    </div>
                                    <input type="hidden" value="1" name="txtEstado">
                                    <input type="button" value="Registrar Contacto" onclick="registrarContactos()" class="btn-registrar-contacto">
                                </form>
                            </div>

                            <div class="tabla-contactos">
                                <div class="tablas-contactos table-responsive" id="tabla">
                                    <table id="tabla_contactoss" class="table table-hover display" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>RUC Empresa</th>
                                                <th>Nombre Contactos</th>
                                                <th>Cargo</th>
                                                <th>Telefono</th>
                                                <th>Correo</th>
                                                <th>Editar</th>
                                                <th>Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listado-contactos">
                                            <!-- Data en Ajax-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="tabs-4">
                        <div class="frm-tabla-accesos contenedor contenedor-tabla">
                            <div class="frm">
                                <form id="frm-accesos" class="frm-accesos">
                                    <input type="hidden" id="id-acceso" name="id_acceso">
                                    <div>
                                        <label for="txtIdSucursal">Id Sucursal</label>
                                        <input type="text" name="txtIdSucursal" id="txtIdSucursal">
                                    </div>
                                    <div>
                                        <label for="txtNombreAcceso">Nombre Acceso</label>
                                        <input type="text" name="txtNombreAcceso" id="txtNombreAcceso">
                                    </div>
                                    <div>
                                        <label for="txtIdAcceso">Id Acceso</label>
                                        <input type="text" name="txtIdAcceso" id="txtIdAcceso">
                                    </div>
                                    <div>
                                        <label for="txtContraseña">Contraseña</label>
                                        <input type="text" name="txtContraseña" id="txtContraseña">
                                    </div>
                                    <input type="hidden" name="txtEstado" value="1">
                                    <input type="button" value="Registrar" onclick="registrarAccesos()" class="btn-registrar-accesos">
                                </form>
                            </div>

                            <div class="tabla-accesos">
                                <div class="tablas-accesos table-responsive" id="tabla">
                                    <table id="tabla_accesos" class="table table-hover" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Id Sucursal</th>
                                                <th>Nombre Acceso</th>
                                                <th>Id Acceso </th>
                                                <th>Contraseña </th>
                                                <th>editar</th>
                                                <th>eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listado-accesos">
                                            <!-- Data en Ajax-->
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div id="tabs-5">

                        <div class="contenedor">
                            <div class="contenedor contenedor-tabla">
                                <div class="frm">

                                    <form id="frm_logo" method="POST" enctype="multipart/form-data" class="frm-ingreso-bandera">
                                        <div>
                                            <label for="txtBandera">Nombre</label>
                                            <input type="text" name="nombre" id="nombre">
                                            <input type="hidden" name="txtRucEmpresa" id="txtRucEmpresa">
                                        </div>

                                        <div class="input-file">
                                            <div>
                                                <input type="file" name="logo" id="logo">
                                            </div>
                                        </div>

                                        <div class="btn-logo">
                                            <input type="submit" name="btn_registrar" value="Registrar Logo" class="btn-registrar-logo" id="btn_registrar">
                                        </div>
                                    </form>
                                </div>

                                <div class="contenedor-banderas">
                                    <div class="contenedor-img-banderas" id="contenedor-img-banderas">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

    </main>
    <footer></footer>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="text/javascript" src="../js/main.js"></script>
</body>>

</html>