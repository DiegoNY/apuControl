var editar = false;
var editarContacto = false;
var editarSucursall = false;
var editarAcceso = false;
var tableSucursal = "";
var tablaContactos = "";
var tablaAccesos = "";
var tablaGrupos = '';

$(document).ready(function () {
  //SE CARGA EL RUC AL FORMULARIO DE SUCURSAL
  $("#txtRuc").keyup(function () {
    var ruc = $(this).val();
    $("#txtIdEmpresa").val(ruc);
    $("#id-empresa-contacto").val(ruc);
    $("#txtRucEmpresa").val(ruc);
  });

  //CRUD para los grupos //
  tablaGrupos = $("#tabla-grupos").DataTable({
    
    ajax: "mostrarGrupos.php",
    columns: [
      { data: "id" },
      { data: "nombre" },
      { data: "descripcion" },
      { data: "fechaCreacion" },
      { data: "usuarioCreacion" },
      { data: "estado" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-grup"></i>`,
      },
      { defaultContent: `<i class="bi bi-x-circle-fill btn-delet-grup"></i>` },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Grupos :",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  $(document).on("click", ".btn-delet-grup", function () {
    if (confirm("Quieres eliminar el Grupo ?")) {
      let data = tablaGrupos.row($(this).parents()).data();
      console.log(data);
      let id = data.id;
      $.post("eliminarGrupo.php", { id }, function (response) {
        console.log(response);
        tablaGrupos.ajax.reload();
      });
    }
  });

  $(document).on("click", ".btn-edit-grup", function () {
    let data = tablaGrupos.row($(this).parents()).data();
    console.log(data);
    let id = data.id;
    $.post("escuchar-grupo.php", { id }, function (response) {
      let grupo = JSON.parse(response);
      $("#id_grupo").val(grupo.id);
      $("#txtNombre").val(grupo.nombre);
      $("#txtDescripcion").val(grupo.descripcion);
      $("#txtEstado").val(grupo.estado);
      $("#txtUsuCre").val(grupo.usuarioCreacion);
      $("#txtFechCre").val(grupo.fechaCreacion);
      editar = true;
      tablaGrupos.ajax.reload();
    });
  });

  //CRUD SUCURSAL  //
  tableSucursal = $("#tabla_sucursals").DataTable({
    ajax: "mostrar-sucursal.php?id=1",
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "codigo_cofide" },
      { data: "direccion" },
      { data: "ubigeo" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-sucursal"></i>
                      <i class="bi bi-person-plus btn-agregar-acceso"></i>
        `,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill btn-delete-sucursal"></i>`,
      },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  $(document).on("click", ".btn-edit-sucursal", function () {
    let data = tableSucursal.row($(this).parents()).data();
    let id = data.id;
    $.post("escuchar-sucursal.php", { id }, function (response) {
      let sucursal = JSON.parse(response);
      console.log(sucursal);
      $("#id-sucursal").val(sucursal.id);
      $("#txtNombreSucursal").val(sucursal.nombre);
      $("#txtDireccionSucursal").val(sucursal.direccion);
      $("#txtCodigoCofide").val(sucursal.codigo_cofide);
      $("#cboIdu").val(sucursal.ubigeo);
      $("#txtIdEmpresa").val(sucursal.id_empresa);
      editarSucursall = true;
      ides = sucursal.id;
    });
    tableSucursal.ajax.reload();
  });

  $(document).on("click", ".btn-delete-sucursal", function () {
    let data = tableSucursal.row($(this).parents()).data();
    let id = $(data).attr("id");

    $.post("eliminar-sucursal.php", { id }, function (response) {
      console.log(response);
      tableSucursal.ajax.reload();
    });
  });

  // BTN PARA AGREGAR ACCESOS //
  $(document).on("click", ".btn-agregar-acceso", function () {
    let data = tableSucursal.row($(this).parents()).data();
    let id = data.id;

    $.post("escuchar-sucursal.php", { id }, function (response) {
      let sucursal = JSON.parse(response);

      ideSuc = sucursal.id;
      //cargando los datos al frm de acceso se hara con un btn
      $("#txtIdSucursal").val(ideSuc);
      cargarAccesos(ideSuc);
    });
  });

  //CRUD contactos

  tablaContactos = $("#tabla_contactoss").DataTable({
    ajax: "mostrar-contactos.php?id=1",
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "cargo" },
      { data: "telefono" },
      { data: "correo" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-contacto"></i>`,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill btn-delete-contacto"></i>`,
      },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  $(document).on("click", ".btn-delete-contacto", function () {
    let data = tablaContactos.row($(this).parents()).data();
    let id = data.id;

    $.post("eliminar-contactos.php", { id }, function (response) {
      console.log(response);
      tablaContactos.ajax.reload();
    });
  });

  $(document).on("click", ".btn-edit-contacto", function () {
    let data = tablaContactos.row($(this).parents()).data();
    let id = data.id;

    $.post("escuchar-contacto.php", { id }, function (response) {
      let contacto = JSON.parse(response);
      console.log(contacto);
      $("#id-contacto").val(contacto.id);
      $("#nombre-contacto").val(contacto.nombre_contacto);
      $("#cargo-contacto").val(contacto.cargo);
      $("#correo-contacto").val(contacto.correo);
      $("#id-empresa-contacto").val(contacto.id_empresa);
      $("#telefono-contacto").val(contacto.telefono);
      editarContacto = true;
    });
    tablaContactos.ajax.reload();
  });

  //ACCESOS CRUD

  tablaAccesos = $("#tabla_accesos").DataTable({
    ajax: "mostrar-accesos.php?id=1",
    columns: [
      { data: "id" },
      { data: "id_sucursal" },
      { data: "nombreAcceso" },
      { data: "idAcceso" },
      { data: "contrasena" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-acceso"></i>`,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill btn-delete-acceso"></i>`,
      },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  $(document).on("click", ".btn-delete-acceso", function () {
    let data = tablaAccesos.row($(this).parents()).data();
    let id = data.id;

    console.log(id);

    $.post("eliminar-acceso.php", { id }, function (response) {
      console.log(response);
      mostrarAccesos();
    });
  });

  $(document).on("click", ".btn-edit-acceso", function () {
    let data = tablaAccesos.row($(this).parents()).data();
    let id = data.id;

    $.post("escuchar-acceso.php", { id }, function (response) {
      let accesos = JSON.parse(response);
      $("#id-acceso").val(accesos.id);
      $("#txtIdSucursal").val(accesos.id_sucursal);
      $("#txtNombreAcceso").val(accesos.nombreAcceso);
      $("#txtIdAcceso").val(accesos.idAcceso);
      $("#txtContraseña").val(accesos.contrasena);
      editarAcceso = true;
    });
  });

  //ubigeo cargado al formulario
  $.ajax({
    url: "mostrar-ubigeo.php",
    type: "GET",
    success: function (response) {
      let ubigeo = JSON.parse(response);
      let template = "";
      ubigeo.forEach((ubigeo) => {
        template += `

        <option value="${ubigeo.id}">${ubigeo.distrito}</option>

        `;
      });
      $("#cboIdu").html(template);
      $("#cboIdub").html(template);
    },
  });
});

$(function () {
  $("#tabs").tabs();
});

function cargarSucursal(ruc) {
  tableSucursal.destroy();
  tableSucursal = $("#tabla_sucursals").DataTable({
    ajax: "mostrar-sucursal.php?id=" + ruc,
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "codigo_cofide" },
      { data: "direccion" },
      { data: "ubigeo" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-sucursal"></i>
                      <i class="bi bi-person-plus btn-agregar-acceso"></i>
        `,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill btn-delete-sucursal"></i>`,
      },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
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
  tablaContactos.destroy();
  tablaContactos = $("#tabla_contactoss").DataTable({
    ajax: "mostrar-contactos.php?id=" + ruc,
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "cargo" },
      { data: "telefono" },
      { data: "correo" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-contacto"></i>`,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill btn-delete-contacto"></i>`,
      },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
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
  tablaAccesos.destroy();
  tablaAccesos = $("#tabla_accesos").DataTable({
    ajax: "mostrar-accesos.php?id=" + id_sucursal,
    columns: [
      { data: "id" },
      { data: "id_sucursal" },
      { data: "nombreAcceso" },
      { data: "idAcceso" },
      { data: "contrasena" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-acceso"></i>`,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill btn-delete-acceso"></i>`,
      },
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
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

// ALERTAS //

function mensajes(response, mensaje, error) {
  if (response == "ingresado") {
    Swal.fire("Registrado con exito", `${mensaje}`, "success").then(() => {
      console.log("tabla actualizada");
      mostrarLogoss();
    });
  } else {
    Swal.fire("Completa todos los campos", `${error}`, "error").then(() => {
      console.log("no hay datos");
    });
  }
}

// CRUD DEL LOGO  //

function mostrarLogoss(id) {
  $.ajax({
    url: "mostrar-logo.php?id=" + id,
    type: "GET",
    success: function (response) {
      let logo = JSON.parse(response);
      let template = "";

      logo.forEach((logo) => {
        template += `

        <div class="contenedor-img" id-logo="${logo.id}">
        <img src="${logo.ruta}" alt="${logo.nombre}">
        <button  class="btn-delete-logo btn btn-outline-danger">Borrar</button>
        </div>
        `;
      });
      $("#contenedor-img-banderas").html(template);
    },
  });
}

$(document).on("click", ".btn-delete-logo", function () {
  let element = $(this)[0].parentElement;
  let id = $(element).attr("id-logo");
  console.log(id);
  $.post("eliminar-logo.php", { id }, function (response) {
    console.log(response);
    mostrarLogoss();
  });
});

document.getElementById("btn_registrar").addEventListener("click", (e) => {
  e.preventDefault();

  let frm = document.getElementById("frm_logo");
  let frmdata = new FormData(frm);

  $.ajax({
    method: "post",
    url: "registrar-logo.php",
    data: frmdata,
    cache: false,
    processData: false,
    contentType: false,
    success: (response) => {
      console.log(response);
      let data = JSON.parse(response);
      data.forEach((data) => {
        mensajes(
          data.mensaje,
          "Ingresaste un Logo 😃",
          "Seguro falto el nombre 😲"
        );
        mostrarLogoss(data.ruc);
      });
    },
  });
});

//CRUD ACCESOS
function registrarAccesos() {
  let url =
    editarAcceso === false ? "registrar-accesos.php" : "editar-acceso.php";
  $.ajax({
    url: url,
    data: $("#frm-accesos").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mensajes(
        response,
        "Bien Se ingresaron los accesos 😀",
        "Completa Todos los campos"
      );
      editarAcceso = false;
      tablaAccesos.ajax.reload();
    },
  });

  $("#frm-accesos").trigger("reset");
}

//Para la sucursal

function registrarSucursal() {
  let url =
    editarSucursall === false
      ? "registrar-sucursal.php"
      : "editar-sucursal.php";
  $.ajax({
    url: url,
    data: $("#frm-sucursal").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mensajes(
        response,
        "Ok, se registro la sucursal",
        "Te falta llenar algunos datos importantes ☹"
      );
      editarSucursall = false;
      tableSucursal.ajax.reload();
    },
  });
  $("#frm-sucursal").trigger("reset");
}

//Para los Contactos
function registrarContactos() {
  let url =
    editarContacto === false
      ? "registrar-contactos.php"
      : "editar-contacto.php";
  $.ajax({
    url: url,
    data: $("#frm-contactos").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mensajes(response, "Contacto Registrado", "Rellena todos los campos ❌");
      editarContacto = false;
      tablaContactos.ajax.reload();
    },
  });
  $("#frm-contactos").trigger("reset");
}

//para los grupos

function RegistrarGrupo() {
  let url = editar === false ? "procesarGrupo.php" : "editar-grupo.php";
  $.ajax({
    type: "GET",
    data: $("#frm_grupo").serialize(),
    url: url,
    success: function (data) {
      mensajes(data, "Se registro el grupo 🐱‍👤", "Rellena todos los campos");
      cargaGrupoEnFrm();
      tablaGrupos.ajax.reload();
    },
  });
  $("#frm_grupo").trigger("reset");
}

cargaGrupoEnFrm();
function cargaGrupoEnFrm() {
  $.ajax({
    url: "mostrar-grupo-formulario.php",
    type: "GET",
    success: function (response) {
      let grupos = JSON.parse(response);
      let template = "";
      grupos.forEach((grupos) => {
        template += `
                
                <option value="${grupos.nombre}">${grupos.nombre}</option>
              
        `;
      });
      $("#cbogrupo").html(template);
    },
  });
}

//PARA LA EMPRESA

//recibo valores por post
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get("id");
let edit = urlParams.get("edit");
let ruc = urlParams.get("ruc");

editarEmpresas(id, edit, ruc);


function editarEmpresas(id, edit, ruc) {
  $.post("escuchar-empresa.php", { id }, function (response) {
    console.log(response);
    let empresa = JSON.parse(response);

    $("#txtNombreCo").val(empresa.nom_comercial);
    $("#id").val(empresa.id);
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
    $("#cboIdu").val(empresa.id_ubigeo);
    $("#cboEstado").val(empresa.estado);
    editar = edit;
    cargarSucursal(ruc);
    cargarContactos(ruc);
    mostrarLogoss(ruc);
  });

}

function RegistrarEmpresa() {
  let url = editar === false ? "registrar-empresa.php" : "editar-empresa.php";
  $.ajax({
    url: url,
    type: "GET",
    data: $("#frm_empresa").serialize(),
    success: function (response) {
      let data = JSON.parse(response);
      data.forEach((data) => {
        let mensaje = data.mensaje;
        let ruc = data.ruc;

        cargarSucursal(ruc);
        cargarContactos(ruc);
        mostrarLogoss(ruc);
        mensajes(mensaje, "Empresa Ingresada Con exito", "Te faltan Datos");
      })
    },
  });

  $("#frm_empresa").trigger("reset");
}
