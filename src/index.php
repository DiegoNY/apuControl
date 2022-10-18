<?php
$fecha = date('d/m/y');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!--DataTable-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
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

</head>

<body>
    <!-- Prueba index -->
    <header></header>
    <main>
        <div class="contenedor">

            <div class="frm-tabla-empresa contenedor contenedor-tabla">
                <div class="frm ">
                    <form id="frm_empresa " class="frm-conten">
                        <input type="hidden" id="id" name="id">
                        <div>
                            <label for="txtNombreCo"> Nombre</label>
                            <input type="text" value="" name="txtNombreCo" id="txtNombreCo">
                        </div>
                        <div>
                            <label for="txtRuc"> Ruc</label>
                            <input type="text" value="" name="txtRuc" id="txtRuc">
                        </div>
                        <div>
                            <label for="txtRazonSocial">Razon social</label>
                            <input type="text" value="" name="txtRazonSocial" id="txtRazonSocial">
                        </div>
                        <div>
                            <label for="txtDireccion">Direccion</label>
                            <input type="text" value="" name="txtDireccion" id="txtDireccion">
                        </div>
                        <div>

                            <label for="cboTipoSistema">Selecciona el tipo de sistema</label>
                            <select name="cboTipoSistema" id="cboTipoSistema">
                                <option value="GESFARMA">GESFARMA</option>
                                <option value="APUGESCOM" selected>APUGESCOM</option>

                            </select>
                        </div>
                        <div>
                            <label for="cboIdGrupo">Seleccion Grupo</label>
                            <select id="cbogrupo" name="txtIdGrupo">
                                <option value="value">value</option>
                            </select>
                        </div>
                        <div>
                            <label for="cboIdRubro">Seleccion el Rubro</label>
                            <select name="cboIdRubro" id="cboIdRubro">
                                <option value="EDS">EDS</option>
                                <option value="BOTICAS" selected>BOTICAS</option>
                                <option value="MARKETS">MARKETS</option>
                            </select>
                        </div>
                        <div>
                            <label for="cboTipoEnvio">Seleccion el tipo de envio</label>
                            <select name="cboTipoEnvio" id="cboTipoEnvio">
                                <option value="OSE">OSE</option>
                                <option value="SUNAT" selected>SUNAT</option>
                            </select>
                        </div>
                        <div>
                            <label for="cboIdTipoIntegracion">Selecciona el tipo de integracion</label>
                            <select name="cboIdTipoIntegracion" id="cboIdTipoIntegracion">
                                <option value="DBF">DBF</option>
                                <option value="TXT" selected>TXT</option>
                                <option value="JSON">JSON</option>
                            </select>
                        </div>
                        <!-- fecha -->
                        <input type="hidden" name="txtFechaRegistro" id="txtFechaRegistro" value="<?php echo $fecha; ?>">
                        <div>
                            <label for="txtEstadoComercial">Ingresa el estado comercial</label>
                            <input type="text" name="txtEstadoComercial" id="txtEstadoComercial">
                        </div>
                        <div>
                            <label for="cboTipoPersona">Selecciona el tipo de persona</label>
                            <select name="cboTipoPersona" id="cboTipoPersona">
                                <option value="NATURAL">Natural</option>
                                <option value="JURIDICA" selected>Juridica</option>
                            </select>
                        </div>
                        <div>
                            <label for="cboIdu ">Selecciona el codigo ubigeo </label>
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
                        <input type="button" onclick="RegistrarEmpresa()" value="ingresar Empresa" class="btn-frm-empresa">
                    </form>
                </div>

                <div class="tabla-empresas">
                    <div class="tabla-empresa table-responsive">
                        <table id="tabla_empresas" class="table table-bordered border table-hover" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Ruc</th>
                                    <th>Razon Social</th>
                                    <th>Ubigeo</th>
                                    <th>Grupo</th>
                                    <th>Rubro</th>
                                    <th>Tipo de envio</th>
                                    <th>Tipo de Integracion</th>
                                    <th>Fecha de registro</th>
                                    <th>Estado comercial</th>
                                    <th>Tipo de persona</th>
                                    <th>Estado</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="listado-empresas">
                                <!-- Data en Ajax-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
        <div id="tabs" class="tab">
            <ul>
                <li><a href="#tabs-1">Grupo</a></li>
                <li><a href="#tabs-2">Sucursal</a></li>
                <li><a href="#tabs-3">Contactos</a></li>
                <li><a href="#tabs-4">Accesos</a></li>
            </ul>
            <div id="tabs-1">

                <div class=" contenedor ">

                    <div class="formulario-registro-grupos contenedor contenedor-tabla">
                        <form id="frm_grupo" name="frm_grupo">
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
                            <div>
                                <input type="hidden" value="1" name="txtEstado" id="txtEstado">
                            </div>
                            <div>
                                <label for="txtUsuCre">Usuario Creacion :</label>
                                <input type="text" name="txtUsuCre" id="txtUsuCre">
                            </div>
                            <div>
                                <input type="hidden" name="txtFechCre" id="txtFechCre" value="<?php echo $fecha; ?>">
                            </div>
                            <input type="button" onclick="RegistrarGrupo()" value="ingresar Grupo">
                        </form>

                        <div class="tabla-grupo">
                            <div class="tablas-empresa table-responsive">
                                <table id="tabla-grupo" class="table table-bordered border table-hover" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Nombre </th>
                                            <th>Descripcion </th>
                                            <th>Fecha Creacion </th>
                                            <th>Usuario Creacion</th>
                                            <th>Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody id="listado-grupos">
                                        <!-- Data en Ajax-->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <h1 id="alerta" class="alert "></h1>
                </div>
            </div>
            <div id="tabs-2">
                <div class="contenedor  contenedor-tabla">
                    <div class="frm-sucursal">
                        <form id="frm-sucursal">
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
                            <input type="button" value="Registrar" onclick="registrarSucursal();">
                        </form>
                    </div>

                    <div class="tabla-sucursal">
                        <div class="tablas-sucursal table-responsive">
                            <table id="tabla_sucursal" class="table table-bordered border table-hover" style="width:100%">
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
                    <div class="frm-contactos">
                        <form id="frm-contactos">
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
                            <input type="button" value="Registrar Contacto" onclick="registrarContactos()">
                        </form>
                    </div>

                    <div class="tabla-contactos">
                        <div class="tablas-contactos table-responsive">
                            <table id="tabla_contactos" class="table table-bordered border table-hover" style="width:100%">
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
                    <div class="frm-accesos">
                        <form id="frm-accesos">
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
                            <input type="button" value="Registrar" onclick="registrarAccesos()">
                        </form>
                    </div>
                    <div class="tabla-accesos">
                        <div class="tablas-accesos table-responsive">
                            <table id="tabla_accesos" class="table table-bordered border table-hover" style="width:100%">
                                <thead>
                                    <tr>
                                        <th>Id Sucursal</th>
                                        <th>Nombre Acceso</th>
                                        <th>Id Acceso </th>
                                        <th>Contraseña </th>
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



    <!-- Maquetas -->
    <div class="formulario-tabla-grupo inactive">

        <div class="formulario-registro-grupos ">
            <form id="frm_grupo" name="frm_grupo">
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
                <div>
                    <input type="hidden" value="1" name="txtEstado" id="txtEstado">
                </div>
                <div>
                    <label for="txtUsuCre">Usuario Creacion :</label>
                    <input type="text" name="txtUsuCre" id="txtUsuCre">
                </div>
                <?php $fecha = date('d/m/y'); ?>
                <div>
                    <label for="txtFechCre">Fecha Creacion <?php echo  $fecha; ?>:</label>
                    <input type="text" name="txtFechCre" id="txtFechCre">
                </div>
                <input type="button" onclick="RegistrarGrupo()" value="ingresar Grupo">
            </form>

            <div class="tabla-grupo">
                <div class="tablas-empresa table-responsive">
                    <table id="tabla-grupo" class="table table-bordered border table-hover" style="width:100%">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre </th>
                                <th>Descripcion </th>
                                <th>Fecha Creacion </th>
                                <th>Usuario Creacion</th>
                                <th>Estatus</th>
                            </tr>
                        </thead>
                        <tbody id="listado-grupos">
                            <!-- Data en Ajax-->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <h1 id="alerta" class="alert "></h1>
    </div>

    <div class="frm-tabla-empresa inactive">
        <div class="frm">
            <form id="frm_empresa">
                <input type="hidden" id="id" name="id">
                <div>
                    <label for="txtNombreCo"> Nombre</label>
                    <input type="text" value="" name="txtNombreCo" id="txtNombreCo">
                </div>
                <div>
                    <label for="txtRuc"> Ruc</label>
                    <input type="text" value="" name="txtRuc" id="txtRuc">
                </div>
                <div>
                    <label for="txtRazonSocial">Razon social</label>
                    <input type="text" value="" name="txtRazonSocial" id="txtRazonSocial">
                </div>
                <div>
                    <label for="txtDireccion">Direccion</label>
                    <input type="text" value="" name="txtDireccion" id="txtDireccion">
                </div>
                <div>

                    <label for="cboTipoSistema">Selecciona el tipo de sistema</label>
                    <select name="cboTipoSistema" id="cboTipoSistema">
                        <option value="GESFARMA">GESFARMA</option>
                        <option value="APUGESCOM" selected>APUGESCOM</option>

                    </select>
                </div>
                <div>
                    <label for="cboIdGrupo">Seleccion Grupo</label>
                    <select id="cbogrupo" name="txtIdGrupo">
                        <option value="value">value</option>
                    </select>
                </div>
                <div>
                    <label for="cboIdRubro">Seleccion el Rubro</label>
                    <select name="cboIdRubro" id="cboIdRubro">
                        <option value="EDS">EDS</option>
                        <option value="BOTICAS" selected>BOTICAS</option>
                        <option value="MARKETS">MARKETS</option>
                    </select>
                </div>
                <div>
                    <label for="cboTipoEnvio">Seleccion el tipo de envio</label>
                    <select name="cboTipoEnvio" id="cboTipoEnvio">
                        <option value="OSE">OSE</option>
                        <option value="SUNAT" selected>SUNAT</option>
                    </select>
                </div>
                <div>
                    <label for="cboIdTipoIntegracion">Selecciona el tipo de integracion</label>
                    <select name="cboIdTipoIntegracion" id="cboIdTipoIntegracion">
                        <option value="DBF">DBF</option>
                        <option value="TXT" selected>TXT</option>
                        <option value="JSON">JSON</option>
                    </select>
                </div>
                <div>
                    <label for="txtFechaRegistro">Ingresela fecha de registro</label>
                    <input type="text" name="txtFechaRegistro" id="txtFechaRegistro">
                </div>
                <div>
                    <label for="txtEstadoComercial">Ingresa el estado comercial</label>
                    <input type="text" name="txtEstadoComercial" id="txtEstadoComercial">
                </div>
                <div>
                    <label for="cboTipoPersona">Selecciona el tipo de persona</label>
                    <select name="cboTipoPersona" id="cboTipoPersona">
                        <option value="NATURAL">Natural</option>
                        <option value="JURIDICA" selected>Juridica</option>
                    </select>
                </div>
                <div>
                    <label for="cboIdu ">Selecciona el codigo ubigeo </label>
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
                <input type="button" onclick="RegistrarEmpresa()" value="ingresar Empresa">
            </form>
        </div>

        <div class="tabla-empresas">
            <div class="tablas-empresa table-responsive">
                <table id="tabla_empresas" class="table table-bordered border table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Ruc</th>
                            <th>Social</th>
                            <th>Ubigeo</th>
                            <th>Grupo</th>
                            <th>Rubro</th>
                            <th>Tipo de envio</th>
                            <th>Fecha de registro</th>
                            <th>Estado comercial</th>
                            <th>Tipo de persona</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody id="listado-empresas">
                        <!-- Data en Ajax-->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="frm-tabla-contactos inactive">
        <div class="frm-contactos">
            <form id="frm-contactos">
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
                <input type="button" value="Registrar Contacto" onclick="registrarContactos()">
            </form>
        </div>

        <div class="tabla-contactos">
            <div class="tablas-contactos table-responsive">
                <table id="tabla_contactos" class="table table-bordered border table-hover" style="width:100%">
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

    <div class="frm-tabla-sucursal inactive ">
        <div class="frm-sucursal">
            <form id="frm-sucursal">
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
                <input type="button" value="Registrar" onclick="registrarSucursal();">
            </form>
        </div>

        <div class="tabla-sucursal">
            <div class="tablas-sucursal table-responsive">
                <table id="tabla_sucursal" class="table table-bordered border table-hover" style="width:100%">
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

    <div class="frm-tabla-accesos inactive">
        <div class="frm-accesos">
            <form id="frm-accesos">
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
                <input type="button" value="Registrar" onclick="registrarAccesos()">
            </form>
        </div>
        <div class="tabla-accesos">
            <div class="tablas-accesos table-responsive">
                <table id="tabla_accesos" class="table table-bordered border table-hover" style="width:100%">
                    <thead>
                        <tr>
                            <th>Id Sucursal</th>
                            <th>Nombre Acceso</th>
                            <th>Id Acceso </th>
                            <th>Contraseña </th>
                        </tr>
                    </thead>

                    <tbody id="listado-accesos">
                        <!-- Data en Ajax-->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</body>

</html>
<style>
    .inactive {
        display: none;
    }
</style>
<script type="text/javascript" src="js/main.js"></script>