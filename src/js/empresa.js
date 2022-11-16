let tableSucursal = "";
const btnSalir = document.getElementById("btnSalir");

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);

(async () => {

  await fetch('../processes/pruebaSession.php')
    .then(response => response.json())
    .then(nombre => {


      let usuario = nombre.usuario[0];

      if (usuario === null) {

        window.location.replace('login.html');

      } else {

        let nombreUsuario = document.getElementById('nombreUsuario').innerText = ` ${usuario}`;
        let nombreUsuario2 = document.getElementById('nombreUsuarioNav').innerText = ` ${usuario}`;

      }
    });


})()


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
      {
        data: 'logo', "render": function (data, type, row) {
          return `<center><img src="../${data}" style="width:50px; height:50px;"></center>`
        }
      },
      { data: "ruc" },
      { data: "nom_comercial" },
      { data: "id_grupo" },
      { data: "id_rubro" },
      { data: "tipo_envio" },
      { data: "estado_comercial" },
      {
        defaultContent: `<div class="opciones-tabla-empresa"><div class="dropdown  ">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-calendar3 text-primary"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li id="btn-editar-empresa"><a class="dropdown-item">Editar</a></li>
        <li  data-bs-toggle="modal" data-bs-target="#sucursales" id="btn-sucursales"><a class="dropdown-item"  >Sucursales</a></li>
        <li  data-bs-toggle="modal" data-bs-target="#contactos" id="btn-contactos"><a class="dropdown-item" >Contactos</a></li>
        <li class="btn-delet"><a class="dropdown-item">Eliminar</a></li>
      </ul>
    </div><div><i class="bi bi-eye" data-bs-toggle="modal" data-bs-target="#empresa" id="mostrarTodo"></i></div></div>`,
      },
    ],
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Empresas",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
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

  btnSalir.addEventListener("click",async function(){

  
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

      let ubigeo_option = document.getElementById(`${empresa.id_ubigeo}`);
      //seleccionarla
      ubigeo_option.setAttribute("selected", "true");

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
        { data: "id" },
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
        loadingRecords: "Cargando...",
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
        loadingRecords: "Cargando...",
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
      "paging": true,
      "order": [[0, 'desc'], [1, 'desc']],
      ajax: "../processes/mostrar-accesos.php?id=" + id_sucursal,
      columns: [
        { data: "id" },
        { data: "id_sucursal" },
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
        loadingRecords: "Cargando...",
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

});
