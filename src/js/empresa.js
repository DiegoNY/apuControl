let tableSucursal = "";
const btnSalir = document.getElementById("btnSalir");

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);

const MODULO = 4;


(async () => {

  await fetch('../processes/pruebaSession.php')
    .then(response => response.json())
    .then(nombre => {

      console.log(nombre);
      let usuario = nombre.usuario[0];

      if (usuario === null) {

        window.location.replace('login.html');

      } else {

        var user = nombre.usuario[1]

        var registro = document.getElementById('registrarEmpresa');
        var infoSis = document.getElementById('registrarInformacionSistema');
        var btnR = document.getElementById("tabla_empresasas_length");
        btnR.setAttribute('style', 'display:none;')

        var btnDc = document.getElementById("detalleContacto");
        var btnDs = document.getElementById("detalleSucursal");



        let nombreUsuario = document.getElementById('nombreUsuario').innerText = ` ${usuario}`;
        let nombreUsuario2 = document.getElementById('nombreUsuarioNav').innerText = ` ${usuario}`;

        var permiso = false;
        var modulosAcceder = []

        nombre.usuario.permisos.forEach(permisos => {

          if (permisos.modulo == MODULO) permiso = true;

          modulosAcceder.push(permisos.modulo);

        })

        if (!permiso) window.location.replace('../processes/validator/CargaModulosPermitidos.php');

        let menu = document.querySelector('#navigationMenu');
        modulosAcceder.forEach(modulos => {

          switch (true) {

            case modulos == 1:
              btnR.setAttribute('style', '')
              CrearMenuItem('index.html', 'registrarEmpresa', 'bi bi-bookmark-plus', 'Registrar Empresas');


              break;

            case modulos == 2:

              CrearMenuItem('vista-contactos.html', 'detalleContacto', 'bi bi-person-rolodex', 'Detalle contactos');


              console.log('Acceso' + modulos)

              break;

            case modulos == 3:

              CrearMenuItem('vista-registro-sistemas.html', 'registrarInformacionSistema', 'bi bi-archive', ' Informacion del Sistema ')

              break;

            case modulos == 4:

              CrearMenuItem('vista-empresa.html', 'detalleContacto', 'icon-home4', 'Listar Empresa', true);

              break;

            case modulos == 5:

              CrearMenuItem('registro-usuarios.html', 'registroUsuario', 'bi bi-person-plus', 'Registrar usuario');

              break;


            default:
              console.log("default");
              break;

          }
        })

      }
    });


})()

function CrearMenuItem(links, idNavigation, icono, texto, activo = false) {

  let menu = document.querySelector('#navigationMenu');


  let navigation = document.createElement('li');
  navigation.setAttribute('class', 'nav-item');
  navigation.setAttribute('id', idNavigation);
  let link = document.createElement('a');
  link.setAttribute('href', links);

  if (activo)
    link.setAttribute('class', 'nav-link active');
  if (!activo)
    link.setAttribute('class', 'nav-link');

  let img = document.createElement('i');
  img.setAttribute('class', icono);
  let span1 = document.createElement('span');
  span1.innerText = texto;

  link.appendChild(img);
  link.appendChild(span1);

  navigation.appendChild(link);


  menu.appendChild(navigation);

}


$(document).ready(function () {



  $.ajax({
    url: "../processes/mostrar-ubigeo.php",
    type: "GET",
    success: function (response) {
      let ubigeo = JSON.parse(response);
      let template = "";
      ubigeo.forEach((ubigeo) => {
        template += `

        <option id="${ubigeo.ubigeo}" value="${ubigeo.ubigeo}">${ubigeo.distrito}</option>

        `;
      });
      $("#cboIdu").html(template);
      $("#cboIdub").html(template);
    },
  });


  //empresa cargando data
  let tablaEmpresa = $("#tabla_empresasas").DataTable({
    "scrollCollapse": true,
    destroy: true,
    "paging": true,
    "order": [[0, 'desc'], [1, 'desc']],
    rowReorder: true,
    ajax: "../processes/mostrar-empresas.php",
    columns: [
      { data: "id" },
      { data: "ruc" },
      { data: "razon_social" },
      { data: "nom_comercial" },
      { data: "id_grupo" },
      { data: "id_rubro" },
      { data: "tipo_envio" },
      {
        data: "estado_comercial", "render": function (data) {

          if (data.cargo != "tecnico") {

            if (data.estado === "INGRESADO") {

              return `<p class="text-center "> <span class="badge bg-success text-light">${data.estado}</span></p>`

            } else if (data.estado === "POR_INSTALAR") {

              return `<p class="text-center "> <span class="badge bg-info  text-light">${data.estado}</span></p>`

            } else {

              return `<p class="text-center "> <span class="badge bg-warning text-light">${data.estado}</span></p>`

            }

          } else {
            return `<span class="badge bg-success text-light"> Activo </span>`
          }
        }
      },
      {
        data: "cargo", "render": function (data) {
          if (data === "administrador") {
            return `<div class="opciones-tabla-empresa"><div class="dropdown  ">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-calendar3 text-info"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li id="btn-editar-empresa" class="s "><a class="dropdown-item">Editar</a></li>
              <li  data-bs-toggle="modal" data-bs-target="#sucursales" id="btn-sucursales"><a class="dropdown-item"  >Sucursales</a></li>
              <li  data-bs-toggle="modal" data-bs-target="#contactos" id="btn-contactos"><a class="dropdown-item" >Contactos</a></li>
              <li class="btn-delet" id="eli"><a class="dropdown-item">Eliminar</a></li>
            </ul>
          </div><div><i class="bi bi-eye btn-outline-success" data-bs-toggle="modal" data-bs-target="#empresa" id="mostrarTodo"></i></div></div>`
          } else if (data === "contabilidad") {
            return `
            <div class="opciones-tabla-empresa"><div class="dropdown  ">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-calendar3 text-info"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li  data-bs-toggle="modal" data-bs-target="#sucursales" id="btn-sucursales"><a class="dropdown-item"  >Sucursales</a></li>
              <li  data-bs-toggle="modal" data-bs-target="#contactos" id="btn-contactos"><a class="dropdown-item" >Contactos</a></li>
            </ul>
            </div><div><i class="bi bi-eye btn-outline-success" data-bs-toggle="modal" data-bs-target="#empresa" id="mostrarTodo"></i></div></div>`
          } else {
            return `<div class="opciones-tabla-empresa"><div class="dropdown  ">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-calendar3 text-info"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          
              <li  data-bs-toggle="modal" data-bs-target="#sucursales" id="btn-sucursales"><a class="dropdown-item"  >Sucursales</a></li>
              <li  data-bs-toggle="modal" data-bs-target="#contactos" id="btn-contactos"><a class="dropdown-item" >Contactos</a></li>
            </ul>`
          }
        }
      },
      {
        defaultContent: ""
      },
    ],
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "   <a href='index.html' class='btn btn-primary'> Agregar Empresa +</a>",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "",
      "searchPlaceholder": "Buscar por..",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "<i class='fi fi-rr-angle-right'></i>",
        "previous": "<i class='fi fi-rr-angle-left'></i>",
      },
    }

  });


  $(document).on("click", ".btn-delet", async function () {
    const module = await import('./alertas.js');

    let data = tablaEmpresa.row($(this).parents()).data();
    console.log(data);
    let id = data.id;
    module.eliminar("Se eliminara la empresa", id, tablaEmpresa, "../processes/delete/eliminar-empresa.php");

  });

  $(document).on("click", "#btn-editar-empresa", function () {

    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc;
    let id = data.id;
    window.location.replace(`index.html?id=${id}&edit=2&ruc=${ruc}`);

  });

  $(document).on("click", "#btn-sucursales", function () {

    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc;
    let nombreEmpresa = data.nom_comercial;
    let nombreEmpresaSucursal = document.getElementById("exampleModalLabel");

    nombreEmpresaSucursal.innerText = `Sucursale Empresa  ${nombreEmpresa}`

    console.log(nombreEmpresa);

    cargarSucursal(ruc);

  })

  $(document).on("click", "#btn-contactos", function () {
    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc;

    cargarContactos(ruc)

  })

  $(document).on("click", "#btn-accesos", function () {

    let data = tableSucursal.row($(this).parents()).data();
    let id = data.id;
    cargarAccesos(id);

  })

  $(document).on("click", "#mostrarTodo", function () {


    let data = tablaEmpresa.row($(this).parents()).data();
    let id = data.id;

    datosCompletosEmpresa(id);

  })

  btnSalir.addEventListener("click", async function () {


    fetch('../processes/validator/terminar-sesion.php');

  })

  function datosCompletosEmpresa(id) {


    $.post("../processes/listener/escuchar-empresa.php", { id }, function (response) {
      let empresa = JSON.parse(response);

      console.log(empresa);


      $("#txtNombreCo").val(empresa.nom_comercial);
      $("#txtRuc").val(empresa.ruc);
      $("#txtRazonSocial").val(empresa.razon_social);
      $("#txtDireccion").val(empresa.direccion);
      $("#cbogrupo").val(empresa.id_grupo);
      $("#cboTipoSistema").val(empresa.id_tipo_sistema);
      $("#cboIdRubro").val(empresa.id_rubro);
      $("#cboTipoEnvio").val(empresa.tipo_envio);
      $("#cboIdTipoIntegracion").val(empresa.id_tipo_integracion);
      $("#txtFechaRegistro").val(empresa.fecha_registro);
      $("#txtEstadoComercial").val(empresa.estado_comercial);
      $("#cboTipoPersona").val(empresa.tipo_persona);
      $("#cboEstado").val(empresa.estado);
      $("#txtIdGrupo").val(empresa.id_grupo);
      $("#proveedor").val(empresa.proveedor);
      $("#usuarioClaveSol").val(empresa.usuarioclavesol);
      $("#contraseñaClaveSol").val(empresa.clavesol);

      let ubigeo_option = document.getElementById(`${empresa.id_ubigeo}`);
      //seleccionarla
      ubigeo_option.setAttribute("selected", "true");

      const img = document.querySelector("#preview_logo");
      img.setAttribute("src", `.${empresa.img}`)


    });


  }

  function cargarSucursal(ruc) {

    tableSucursal = $("#tabla_sucursals").DataTable({
      destroy: true,
      "scrollCollapse": true,
      "paging": true,
      "order": [[0, 'desc'], [1, 'desc']],
      ajax: "../processes/mostrar-sucursal.php?id=" + ruc,
      columns: [
        { data: "numeroSucursalEmpresa" },
        { data: "id_empresa" },
        { data: "nombre" },
        { data: "codigo_cofide" },
        { data: "direccion" },
        { data: "ubigeo" },
        {
          defaultContent: `<div>
                            <i class="bi bi-shield-check btn-agregar-acceso text-success"  data-bs-toggle="modal" id="btn-accesos" data-bs-target="#accesos"></i></div>
          `,
        }
      ],
      language: {
        decimal: "",
        emptyTable: "No hay información",
        info: "La Empresa tiene _TOTAL_ Sucursales",
        infoEmpty: "Mostrando 0 to 0 of 0 Sucursales",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "",
        loadingRecords: "",
        processing: "Procesando...",
        search: "",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  }

  function cargarContactos(ruc) {
    tablaContactos = $("#tabla_contactoss").DataTable({
      "scrollCollapse": true,
      "paging": true,
      "order": [[0, 'desc'], [1, 'desc']],
      destroy: true,
      ajax: {
        url: "../processes/mostrar-contactos.php?id=" + ruc,
        dataSrc: "data"
      },
      columns: [
        { data: "id" },
        { data: "id_empresa" },
        { data: "nombre" },
        { data: "cargo" },
        { data: "telefono" },
        { data: "correo" },

      ],
      language: {
        decimal: "",
        emptyTable: "No hay información",
        info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "",
        loadingRecords: "",
        processing: "Procesando...",
        search: " ",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  }


  function cargarAccesos(id_sucursal) {
    tablaAccesos = $("#tabla_accesos").DataTable({
      destroy: true,
      "scrollCollapse": true,
      "searching": false,
      "paging": false,
      "order": [[0, 'desc'], [1, 'desc']],
      ajax: "../processes/mostrar-accesos.php?id=" + id_sucursal,
      columns: [
        { data: "id" },
        { data: "id_sucursal" },
        { data: "nombreSistema" },
        { data: "nombreAcceso" },
        { data: "idAcceso" },
        { data: "contrasena" },
        {
          defaultContent: ``,
        },
      ],
      language: {
        decimal: "",
        emptyTable: "No hay información",
        info: "Mostrando _TOTAL_ Accesos",
        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "",
        loadingRecords: "",
        processing: "Procesando...",
        search: " ",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  }

  function cargarRubros() {

    $.ajax({

      url: "../processes/mostrar-rubros.php",
      type: "GET",

      success: function (response) {

        let data = JSON.parse(response);

        let template = "<option value='0' > SELECCIONE </option>";

        data.forEach((rubros) => {

          template += `
  
          <option value="${rubros.nombre}">${rubros.nombre}</option>
          
          `

        })
        $("#cboIdRubro").html(template);

      }


    });

  }

  cargarRubros();

});
