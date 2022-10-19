<?php
$fecha = date('d/m/y');
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
    <!--DataTable-->
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

    <!-- Stylos -->
    <link rel="stylesheet" href="style/style.css">
    <!---TABS LINKS -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!-- TABS -->
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <!-- fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Prueba index -->
    <header></header>
    <main>

        <div class="contenedor ">
            <div class="frm-tabla-empresa">
                <div class="frm">
                    <form id="frm_empresa" class="frm-empresa">
                        <input type="hidden" id="id" name="id">
                        <div class="nombre">
                            <label for="txtNombreCo"> Nombre</label>
                            <input type="text" value="" name="txtNombreCo" id="txtNombreCo">
                        </div>
                        <div class="ruc">
                            <label for="txtRuc"> Ruc</label>
                            <input type="text" value="" name="txtRuc" id="txtRuc">
                        </div>
                        <div class="razon-social">
                            <label for="txtRazonSocial">Razon social</label>
                            <input type="text" value="" name="txtRazonSocial" id="txtRazonSocial">
                        </div>
                        <div class="direccion">
                            <label for="txtDireccion">Direccion</label>
                            <input type="text" value="" name="txtDireccion" id="txtDireccion">
                        </div>
                        <div class="tipo-sis">

                            <label for="cboTipoSistema">Tipo de sistema</label>
                            <select name="cboTipoSistema" id="cboTipoSistema">
                                <option value="GESFARMA">GESFARMA</option>
                                <option value="APUGESCOM" selected>APUGESCOM</option>

                            </select>
                        </div>
                        <div class="cbo-id">
                            <label for="cboIdGrupo">Grupo</label>
                            <select id="cbogrupo" name="txtIdGrupo">
                                <option value="value">value</option>
                            </select>
                        </div>
                        <div class="bdo-id">
                            <label for="cboIdRubro">Rubro</label>
                            <select name="cboIdRubro" id="cboIdRubro">
                                <option value="EDS">EDS</option>
                                <option value="BOTICAS" selected>BOTICAS</option>
                                <option value="MARKETS">MARKETS</option>
                            </select>
                        </div>
                        <div class="cbo-ti">
                            <label for="cboTipoEnvio">Tipo de envio</label>
                            <select name="cboTipoEnvio" id="cboTipoEnvio">
                                <option value="OSE">OSE</option>
                                <option value="SUNAT" selected>SUNAT</option>
                            </select>
                        </div>
                        <div class="cbo-id-tip-inte">
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
                        <div>
                            <label for="txtEstadoComercial">Estado comercial</label>
                            <input type="text" name="txtEstadoComercial" id="txtEstadoComercial">
                        </div>
                        <div>
                            <label for="cboTipoPersona">Tipo de persona</label>
                            <select name="cboTipoPersona" id="cboTipoPersona">
                                <option value="NATURAL">Natural</option>
                                <option value="JURIDICA" selected>Juridica</option>
                            </select>
                        </div>
                        <div>
                            <label for="cboIdu ">Codigo ubigeo </label>
                            <select name="cboIdu" id="cboIdu">
                                <option value="123">123</option>
                                <option value="164" selected>164</option>
                            </select>
                        </div>
                        <div>
                            <label for="cboEstado">Estado</label>
                            <select name="cboEstado" id="cboEstado">
                                <option value="0">Posible Cliente</option>
                                <option value="1" selected>Cliente</option>
                            </select>
                        </div>
                        <div>
                            <input type="hidden" value="1" name="txtEstado">
                            <input type="hidden" value="1" name="txtEliminada">
                        </div>
                        <input type="button" onclick="RegistrarEmpresa()" value="Ingresar Empresa" class="btn-tabla-empresa">
                    </form>
                </div>
                <!-- 
                <div class="tabla-empresas inactive">
                    <div class="tablas-empresa table-responsive container-fluid">
                        <table id="tabla_empresass" class="table  table-borderless table-hover" style="width:100%">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Ruc</th>
                                    <th scope="col">Social</th>
                                    <th scope="col">Ubigeo</th>
                                    <th scope="col">Grupo</th>
                                    <th scope="col">Rubro</th>
                                    <th scope="col">T.Envio</th>
                                    <th scope="col">Tipo Integracion</th>
                                    <th scope="col">Fecha de registro</th>
                                    <th scope="col">Estado comercial</th>
                                    <th scope="col">Tipo de persona</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="listado-empresas">
                                - Data en Ajax-
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div> -->


                <div id="tabs" class="tabs">

                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#tabs-1">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#tabs-2">Sucursal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#tabs-3">Contactos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#tabs-4" >Accesos</a>
                        </li>
                    </ul>

                    <div id="tabs-1">

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
                                        <div>
                                            <label for="txtDescripcion">Descripcion :</label>
                                            <input type="text" name="txtDescripcion" id="txtDescripcion">
                                        </div>
                                        <div class="inactive">
                                            <input type="hidden" value="1" name="txtEstado" id="txtEstado">
                                        </div>
                                        <div>
                                            <label for="txtUsuCre">Usuario Creacion :</label>
                                            <input type="text" name="txtUsuCre" id="txtUsuCre">
                                        </div>
                                        <div>
                                            <input type="hidden" name="txtFechCre" id="txtFechCre" value="<?php echo $fecha; ?>">
                                        </div>
                                        <input type="button" onclick="RegistrarGrupo()" value="ingresar Grupo" class="btn-ingresar-grupo">
                                    </form>
                                </div>


                                <div class="tabla-grupo ">
                                    <div class="tablas-empresa table-responsive conteiner-fluid">
                                        <table id="tabla-grupos" class="table table-borderless table-hover" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th>id</th>
                                                    <th>Nombre </th>
                                                    <th>Descripcion </th>
                                                    <th>Fecha Creacion </th>
                                                    <th>Usuario Creacion</th>
                                                    <th>Estatus</th>
                                                    <th>Editar</th>
                                                    <th>Eliminar</th>
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
                                        <label for="cboIdu">Selecciona el codigo ubigeo </label>
                                        <select name="cboIdu" id="cboIdu">
                                            <option value="1">123</option>
                                            <option value="2" selected>123</option>
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
                                <div class="tablas-sucursal table-responsive">
                                    <table id="tabla_sucursals" class="table table-borderless table-hover" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Id Empresa</th>
                                                <th>Nombre</th>
                                                <th>Ubigeo</th>
                                                <th>Cod Cofide</th>
                                                <th>Direccion</th>
                                                <th>Editar</th>
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
                                        <label for="txtEmpresa">Id Empresa</label>
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
                                <div class="tablas-contactos table-responsive">
                                    <table id="tabla_contactoss" class="table table-borderless table-hover" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Id Empresa</th>
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
                                <div class="tablas-accesos table-responsive">
                                    <table id="tabla_accesos" class="table table-borderless table-hover" style="width:100%">
                                        <thead>
                                            <tr>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

    </main>
    <footer></footer>

    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>

</html>

<script type="text/javascript" src="js/main.js"></script>