var editar = false;
var editarContacto = false;
var editarSucursall = false;
var editarAcceso = false;
var tableSucursal = "";
var tablaContactos = "";
var tablaAccesos = "";
var tablaGrupos = '';
var ruc_id = document.getElementById("ruc_id");
var direccion_input = document.getElementById("txtDireccion");
var estado = document.getElementById("");
var condicion = document.getElementById("");
var nombre_co = document.getElementById("txtNombreCo");
// SE RECIBEN ESTOS VALORES PARA ACTIVAR EL PROCESO DE EDICION DE LA EMPRESA ^_^  
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get("id");
let edit = urlParams.get("edit");
let rucs = urlParams.get("ruc");



if (!rucs) {
} else {
  document.getElementById("ruc_id").value = rucs;
}


$(document).ready(function () {




  // Cargando El ubigeo a los Formularios 

  $.ajax({
    url: "../processes/mostrar-ubigeo.php",
    type: "GET",
    success: function (response) {
      let ubigeo = JSON.parse(response);
      let template = "";
      ubigeo.forEach((ubigeo) => {
        template += `

        <option id="${ubigeo.ubigeo}" value="${ubigeo.id}">${ubigeo.distrito}</option>

        `;
      });
      $("#cboIdu").html(template);
      $("#cboIdub").html(template);
    },
  });


  tableSucursal = $("#tabla_sucursals").DataTable({
    destroy: true,
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    ajax: "../processes/mostrar-sucursal.php",
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "codigo_cofide" },
      { data: "direccion" },
      { data: "ubigeo" },
      {
        defaultContent: `
        <i class="bi bi-pencil-square btn-edit-sucursal"></i>
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

  tablaContactos = $("#tabla_contactoss").DataTable({
    destroy: true,
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    ajax: "../processes/mostrar-contactos.php?",
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "cargo" },
      { data: "telefono" },
      { data: "correo" },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-contacto"></i>
                          <i class="bi bi-x-circle-fill btn-delete-contacto"></i>
        `,
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

  tablaAccesos = $("#tabla_accesos").DataTable({
    destroy: true,
    ajax: {
      url: "../processes/mostrar-accesos.php?id=1",
      dataSrc: ""
    },
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

  //BOTONES ಠ_ಠ

  $(document).on("click", ".btn-delet-grup", async function () {
    const alerta = await import('./alertas.js')
    let data = tablaGrupos.row($(this).parents()).data()
    let id = data.id;
    alerta.eliminar("Asegurate de seleccionar el grupo correcto", id, tablaGrupos, "../processes/delete/eliminarGrupo.php");
  });

  $(document).on("click", ".btn-edit-grup", function () {
    let data = tablaGrupos.row($(this).parents()).data();
    console.log(data);
    let id = data.id;
    $.post("../processes/listener/escuchar-grupo.php", { id }, function (response) {
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

  $(document).on("click", ".btn-edit-sucursal", function () {
    let data = tableSucursal.row($(this).parents()).data();
    let id = data.id;
    $.post("../processes/listener/escuchar-sucursal.php", { id }, function (response) {
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

  $(document).on("click", ".btn-delete-sucursal", async function () {
    const alerta = await import('./alertas.js')
    let data = tableSucursal.row($(this).parents()).data();
    let id = $(data).attr("id");
    alerta.eliminar("Seguro que deseas eliminar la sucursal ?", id, tableSucursal, "../processes/delete/eliminar-sucursal.php");
  });

  $(document).on("click", ".btn-agregar-acceso", function () {
    let data = tableSucursal.row($(this).parents()).data();
    let id = data.id;
    $.post("../processes/listener/escuchar-sucursal.php", { id }, function (response) {
      let sucursal = JSON.parse(response);
      ideSuc = sucursal.id;
      //cargando los datos al frm de acceso se hara con un btn
      $("#txtIdSucursal").val(ideSuc);
      cargarAccesos(ideSuc);
    });
  });


  $(document).on("click", ".btn-delete-contacto", async function () {

    const alerta = await import('./alertas.js')
    let data = tablaContactos.row($(this).parents()).data();
    let id = data.id;
    alerta.eliminar("Seguro de eliminar el contacto ? ", id, tablaContactos, "../processes/delete/eliminar-contactos.php");
  });

  $(document).on("click", ".btn-edit-contacto", function () {
    let data = tablaContactos.row($(this).parents()).data();
    let id = data.id;

    $.post("../processes/listener/escuchar-contacto.php", { id }, function (response) {
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

  $(document).on("click", ".btn-delete-acceso", async function () {
    const alerta = await import('./alertas.js')

    let data = tablaAccesos.row($(this).parents()).data();
    let id = data.id;
    alerta.eliminar("Seguro de eliminar el acceso ? ", id, tablaAccesos, "../processes/delete/eliminar-acceso.php");
  });

  $(document).on("click", ".btn-edit-acceso", function () {
    let data = tablaAccesos.row($(this).parents()).data();
    let id = data.id;

    $.post("../processes/listener/escuchar-acceso.php", { id }, function (response) {
      let accesos = JSON.parse(response);
      $("#id-acceso").val(accesos.id);
      $("#txtIdSucursal").val(accesos.id_sucursal);
      $("#txtNombreAcceso").val(accesos.nombreAcceso);
      $("#txtIdAcceso").val(accesos.idAcceso);
      $("#txtContraseña").val(accesos.contrasena);
      editarAcceso = true;
    });
  });

  $(document).on("click", "#btn_ruc",function(){

     let ruc = $("#txtRuc").val();
     validarRuc(ruc);

  })


});


function cargarSucursal(ruc) {
  tableSucursal.destroy();
  tableSucursal = $("#tabla_sucursals").DataTable({
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
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
        defaultContent: `<div class="contenedor-iconos"><i class="bi bi-pencil-square text-warning btn-edit-sucursal"></i>
                          <i class="bi bi-shield-check btn-agregar-acceso text-success"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                          <i class="bi bi-x-circle-fill text-danger btn-delete-sucursal"></i>
        `,
      }
    ],
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Sucursales",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
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
  tablaContactos.destroy();
  tablaContactos = $("#tabla_contactoss").DataTable({
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    "order": [[0, 'desc'], [1, 'desc']],
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
      {
        defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-contacto"></i>
        <i class="bi bi-x-circle-fill text-danger btn-delete-contacto"></i>
        `,
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
      search: "Contactos ",
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
    "order": [[0, 'desc'], [1, 'desc']],
    ajax: "../processes/mostrar-accesos.php?id=" + id_sucursal,
    columns: [
      { data: "id" },
      { data: "id_sucursal" },
      { data: "nombreAcceso" },
      { data: "idAcceso" },
      { data: "contrasena" },
      {
        defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-acceso"></i>`,
      },
      {
        defaultContent: `<i class="bi bi-x-circle-fill text-danger btn-delete-acceso"></i>`,
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
      search: "Accesos ",
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
    url: "../processes/mostrar-logo.php?id=" + id,
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
  $.post("../processes/delete/eliminar-logo.php", { id }, function (response) {
    console.log(response);
    mostrarLogoss();
  });
});

// document.getElementById("btn_registrar").addEventListener("click", (e) => {

//   e.preventDefault();

//   let frm = document.getElementById("frm_logo");
//   let frmdata = new FormData(frm);
//   $.ajax({
//     method: "POST",
//     url: "../processes/register/registrar-logo.php",
//     data: (frmdata, nombre, ruc),
//     cache: false,
//     processData: false,
//     contentType: false,
//     success: (response) => {
//       console.log(response);
//       let data = JSON.parse(response);
//       data.forEach((data) => {
//         mensajes(
//           data.mensaje,
//           "Ingresaste un Logo 😃",
//           "Seguro falto el nombre 😲"
//         );
//         mostrarLogoss(data.ruc);
//       });
//     },
//   });
// });

//CRUD ACCESOS

function registrarAccesos() {
  let url = editarAcceso === false ? "../processes/register/registrar-accesos.php" : "../processes/edit/editar-acceso.php";

  $.ajax({
    url: url,
    data: $("#frm-accesos").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mensajes(response, "Bien Se ingresaron los accesos 😀", "Completa Todos los campos");
      editarAcceso = false;
      tablaAccesos.ajax.reload();
    },

  });

  $("#frm-accesos").trigger("reset");

}

//PARA LA SUCURSAL

function registrarSucursal() {
  let url = editarSucursall === false ? "../processes/register/registrar-sucursal.php" : "../processes/edit/editar-sucursal.php";
  $.ajax({
    url: url,
    data: $("#frm-sucursal, #ruc_id").serialize(),
    type: "GET",
    success: function (response) {
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
      ? "../processes/register/registrar-contactos.php"
      : "../processes/edit/editar-contacto.php";
  $.ajax({
    url: url,
    data: $("#frm-contactos, #ruc_id").serialize(),
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
  let url = editar === false ? "../processes/register/procesarGrupo.php" : "../processes/edit/editar-grupo.php";
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
    url: "../processes/mostrar-grupo-formulario.php",
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

/**
 *  
 * @param id = el parametreo que se recibe por GET 
 * 
 * *una vez recibido el paramertro valida si no es null para 
 * *para poder ejecutarce asi evitando error de JSON 🙈
 *
 */
editarEmpresas(id, edit);

function editarEmpresas(id, edit) {

  if (id == null)
    return;

  $.post("../processes/listener/escuchar-empresa.php", { id }, function (response) {
    let empresa = JSON.parse(response);
    let ruc_em = empresa.ruc;

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
    tableSucursal.destroy;
    tablaContactos.destroy;
    cargarSucursal(ruc_em);
    cargarContactos(ruc_em);
    mostrarLogoss(ruc_em);

  });
}


function RegistrarEmpresa() {

  let frm = document.getElementById("frm_empresa");
  let frmdata = new FormData(frm);
  let url = editar === false ? "../processes/register/registrar-empresa.php" : "../processes/edit/editar-empresa.php";
  $.ajax({
    url: url,
    type: "POST",
    data: $(frm).serialize(),
    cache: false,
    processData: false,
    contenType: false,
    success: function (response) {
      let data = JSON.parse(response);
      data.forEach((data) => {
        let mensaje = data.mensaje;
        let ruc = data.ruc;
        ruc_id.value = ruc;

        switch (true) {
          case !ruc:
            mensajes(mensaje, "Empresa Ingresada Con exito", "Te faltan Datos");
            break;

          case ruc && mensaje == "ingresado":
            tableSucursal.destroy;
            tablaContactos.destroy;
            cargarSucursal(ruc);
            cargarContactos(ruc);
            mostrarLogoss(ruc);
            mensajes(mensaje, "Empresa Ingresada Con exito", "Te faltan Datos");
            break;
          case ruc && mensaje == "editado":
            mensajes("ingresado", "Editaste una Empresa con exito :D", "error");
          default:
            break;
        }

      })
    },
  });
  $("#frm_empresa").trigger("reset");
}




function validarRuc() {
  $.ajax({
    url: '../processes/validator/consulta-ruc.php?',
    data: $("#txtRuc").serialize(),
    type: 'POST',
    success: function (res) {
      
      let data = JSON.parse(res);
      console.log(data);

      data.forEach((data) => {

        let nombre = data.data.nombre;
        let condicion = data.data.condicion;
        let estado = data.data.estado;
        let ubigeo = data.data.ubigeo;
        let direccion = data.data.direccion;

        direccion_input.value = direccion;
        nombre_co.value = nombre;

        //capturar la opcion con id = ubigeo 

        let ubigeo_option = document.getElementById(`${ubigeo}`);
        
        //seleccionarla

        ubigeo_option.setAttribute("selected", "true")

        console.log(nombre);
        console.log(condicion);
        console.log(estado);
        console.log(ubigeo);
        console.log(direccion);

        switch (estado) {
          case estado = "ACTIVO":
            console.log("Estado activo")
            break;

          case estado = "INACTIVO":
            console.log("estado inactivo");
            break;

          default:
            break;
        }

      })

    },
  })
}

// CARGAR BANDERAAS EN EL FORMULARIO
