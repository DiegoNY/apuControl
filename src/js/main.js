var editar = false;
var editarContacto = false;
var editarSucursall = false;
var editarAcceso = false;
var editarIntegracion = false;
var editarSistema = false;
var tableSucursal = "";
var tablaContactos = "";
var tablaAccesos = "";
var tablaGrupos = '';
var ruc_id = document.getElementById("ruc_id");
var direccion_input = document.getElementById("txtDireccion");
var estado = document.getElementById("");
var condicion = document.getElementById("");
var razon_so = document.getElementById("txtRazonSocial");
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
    
    "scrollCollapse": true,
    "paging": true,
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

  tablaContactos = $("#tabla_contactoss").DataTable({
    destroy: true,
   
    "scrollCollapse": true,
    "paging": true,
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

    $("#txtIdSucursa").val(id);
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

  $(document).on("click", ".btn-delete-grupo", function () {


    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");
    console.log(id);


    Swal.fire({
      title: `Seguro de eliminar grupo ?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar ahora'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        $.post("../processes/delete/eliminarGrupo.php", { id }, function (response) {
          console.log(response);
          mostrarGrupos();

        });

      }
    })

  })
  $(document).on("click", ".btn-editar-grupo", function () {
    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");
    
    $.post("../processes/listener/escuchar-grupo.php", { id }, function (response) {
      let grupo = JSON.parse(response);
      $("#id_grupo").val(grupo.id);
      $("#txtNombre").val(grupo.nombre);
      $("#txtDescripcion").val(grupo.descripcion);
      $("#txtUsuCre").val(grupo.usuarioCreacion);
      editar = true;
      mostrarGrupos();
    });

  })

  $(document).on("click", ".btn-delete-tipoSistema", async function () {


    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");
    console.log(id);


    Swal.fire({
      title: `<i class="bi bi-exclamation-diamond-fill"></i>`,
      icon: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar Sistema'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        $.post("../processes/delete/eliminar-tipo-sistema.php", { id }, function (response) {
          console.log(response);
          mostrarTiposSistema();

        });

      }
    })

  })
  $(document).on("click", ".btn-editar-tipoSistema", function () {

    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");
    console.log(id);

    $.post("../processes/listener/escuchar_tipo_sistema.php", { id }, function (response) {
      console.log(response)
      let tipoSistema = JSON.parse(response);
      $("#id_tipo_sistema").val(tipoSistema.id);
      $("#txtNombre").val(tipoSistema.nombre);
      $("#txtEstado").val(tipoSistema.estado);
      $("#txtFecha").val(tipoSistema.fecha);
      editarSistema = true;
      mostrarTiposSistema();
    });

  })

  $(document).on("click", ".btn-delete-tipoIntegracion", async function () {


    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");
    console.log(id);


    Swal.fire({
      title: `<i class="bi bi-exclamation-diamond-fill"></i>`,
      icon: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar Integracion'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        $.post("../processes/delete/eliminar-tipo-integracion.php", { id }, function (response) {
          console.log(response);
          mostrarTipoIntegracion();

        });

      }
    })

  })
  $(document).on("click", ".btn-editar-tipoIntegracion", function () {

    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");

    console.log(id);

    $.post("../processes/listener/escuchar_tipo_integracion.php", { id }, function (response) {
      let tipoIntegracion = JSON.parse(response);
      $("#id_tipo_integracion").val(tipoIntegracion.id);
      $("#txtNombreIntegracion").val(tipoIntegracion.nombre);
      $("#txtEstadoIntegracion").val(tipoIntegracion.estado);
      $("#txtFechaIntegracion").val(tipoIntegracion.fecha);
      editarIntegracion = true;
      mostrarTipoIntegracion();
    });

  })
  $(document).on("click", "#btn_ruc", function () {

    let ruc = $("#txtRuc").val();
    validarRuc(ruc);

  })


});


function cargarSucursal(ruc) {
  tableSucursal.destroy();
  tableSucursal = $("#tabla_sucursals").DataTable({
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
        defaultContent: `<div class="contenedor-iconos"><i class="bi bi-pencil-square text-warning btn-edit-sucursal" data-bs-toggle="modal" data-bs-target="#sucursal"></i>
                          <i class="bi bi-x-circle-fill text-danger btn-delete-sucursal" ></i>
                          <i class="bi bi-x-circle-fill text-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
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
  tablaContactos.destroy();
  tablaContactos = $("#tabla_contactoss").DataTable({
    "scrollCollapse": true,
    "paging": true,
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
    Swal.fire("REGISTRADA", ``, "success").then(() => {
      console.log("tabla actualizada");
      mostrarLogoss();
    });
  } else {
    Swal.fire("COMPLETA TODOS LOS CAMPOS", ``, "error").then(() => {
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
      mostrarGrupos();
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

mostrarGrupos();

function mostrarGrupos() {
  $.ajax({
    url: "../processes/mostrarGrupos.php",
    type: "GET",
    success: function (response) {
      let grupo = JSON.parse(response);
      let template = "";

      grupo.forEach((grupo) => {
        template += `
        
        <tr class="gridjs-tr" id_grupo="${grupo.id}">
        <td data-column-id="title"
            class="gridjs-td">${grupo.id}
        </td>
        <td data-column-id="director"
            class="gridjs-td">${grupo.nombre}</td>
        <td data-column-id="producer"
            class="gridjs-td">${grupo.descripcion}</td>
        <td data-column-id="producer"
            class="gridjs-td">${grupo.fechaCreacion}</td>
        <td>
        <i class="bi bi-pencil btn-editar-grupo  text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#grupo"></i>
        <i class="bi bi-x-circle-fill text-danger btn-delete-grupo" ></i>
        </td>
    </tr>
   
        
        `;
      });
      $("#listado_grupos").html(template);
    }
  })
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
    type: "GET",
    data: $(frm).serialize(),
    cache: false,
    processData: false,
    contenType: false,
    success: function (response) {

      console.log(response);

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


        let razon = data.data.nombre || "";
        let condicion = data.data.condicion;
        let estado = data.data.estado;
        let ubigeo = data.data.ubigeo;
        let direccion = data.data.direccion || "";
        let error = data.data.error;


        direccion_input.value = direccion;
        razon_so.value = razon;



        switch (error) {
          case error = "RUC debe contener 11 digitos":
            Swal.fire(
              'Error',
              `${error}`,
              'warning'
            )
            break;

          case error = "RUC invalido":
            Swal.fire(
              'Error',
              `${error}`,
              'warning'
            )
            break;
          default:
            break;
        }


        switch (estado) {
          case estado = "ACTIVO":

            informacionEmpresaNueva(estado, condicion, razon);
            //capturar la opcion con id = ubigeo 
            let ubigeo_option = document.getElementById(`${ubigeo}`);
            //seleccionarla
            ubigeo_option.setAttribute("selected", "true");

            break;

          case estado = "INACTIVO":

            Swal.fire(
              'Error',
              `<p class="text-center mb-2 font-size-sm">Estado <span class="badge bg-success text-light">${estado}</span></p>
              `,
              'warning'
            )
            break;

          default:
            break;
        }

      })

    },
  })
}



function informacionEmpresaNueva(estado, condicion, nombre) {

  Swal.fire({
    title: `${nombre}`,
    html: `
    <div class="col-lg-12">

        <div class="card-body">


         <div class="card-body">
          
          <div>

            <p class="text-center mb-2 font-size-sm">Estado <span class="badge bg-success text-light">${estado}</span></p>

          </div>

          <hr>

          <p class="text-center mb-2 font-size-sm"> Condición  <span class="badge bg-info text-light">${condicion}</span></p>

         </div>


        </div>

      </div>`,
    confirm: 'Sign in',
    focusConfirm: false,

  }).then((result) => {

  })

}


function registrarTipoIntegracion(){

  let url = editarIntegracion === false ? "../processes/register/registrar-tipo-integracion.php" : "../processes/edit/editar-tipo-integracion.php";
  $.ajax({
    type: "GET",
    data: $("#frm_tipo_integracion").serialize(),
    url: url,
    success: function (data) {
      mensajes(data, "Se registro el tipo integración", "Rellena todos los campos");
      cargarTipointegracion();
      mostrarTipoIntegracion();
    },
  });

}

mostrarTipoIntegracion();
function mostrarTipoIntegracion(){

  $.ajax({
    url: "../processes/mostrar-tipo-integracion.php",
    type: "GET",
    success: function (response) {
      let tipoIntegra = JSON.parse(response);
      let template = "";

      tipoIntegra.forEach((tipoIntegra) => {
        template += `
        
        <tr class="gridjs-tr" id_grupo="${tipoIntegra.id}">
        <td data-column-id="title"
            class="gridjs-td">${tipoIntegra.id}
        </td>
        <td data-column-id="director"
            class="gridjs-td">${tipoIntegra.nombre}</td>
        
        <td data-column-id="producer"
            class="gridjs-td">${tipoIntegra.fecha}</td>
        <td>
        <i class="bi bi-pencil btn-editar-tipoIntegracion  text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#tipo-integracion"></i>
        <i class="bi bi-x-circle-fill text-danger btn-delete-tipoIntegracion" ></i>
        </td>
    </tr>
   
        
        `;
      });
      $("#listado_tipo_integraciones").html(template);
    }
  })

}

cargarTipointegracion();
function cargarTipointegracion(){

  $.ajax({
    url: "../processes/mostrar-tipo-integracion.php",
    type: "GET",
    success: function (response) {
      let tipoIntegra = JSON.parse(response);
      let template = "";

      tipoIntegra.forEach((tipoIntegra) => {
        template += `
        
        <option value="${tipoIntegra.nombre}">${tipoIntegra.nombre}</option>
        
        `;
      });
      $("#cboIdTipoIntegracion").html(template);
    }
  })

}


function registrarTipoSistema(){

  let url = editarSistema === false ? "../processes/register/registrar-tipo-sistema.php" : "../processes/edit/editar-tipo-sistema.php";
  $.ajax({
    type: "GET",
    data: $("#frm_tipo_sistema").serialize(),
    url: url,
    success: function (data) {
      mensajes(data, "Se registro el tipo sistema", "Rellena todos los campos");
      cargarTiposSistemas();
      mostrarTiposSistema();
    },
  });

}
mostrarTiposSistema();

function mostrarTiposSistema(){

  $.ajax({
    url: "../processes/mostrar-tipo-sistema.php",
    type: "GET",
    success: function (response) {
      let tipoSistema = JSON.parse(response);
      let template = "";

      tipoSistema.forEach((tipoSistema) => {
        template += `
        
        <tr class="gridjs-tr" id_grupo="${tipoSistema.id}">
        <td data-column-id="title"
            class="gridjs-td">${tipoSistema.id}
        </td>
        <td data-column-id="director"
            class="gridjs-td">${tipoSistema.nombre}</td>
        
        <td data-column-id="producer"
            class="gridjs-td">${tipoSistema.fecha}</td>
        <td>
        <i class="bi bi-pencil btn-editar-tipoSistema  text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#tipo-sistema"></i>
        <i class="bi bi-x-circle-fill text-danger btn-delete-tipoSistema" ></i>
        </td>
    </tr>
   
        
        `;
      });
      $("#listado_tipo_sistema").html(template);
    }
  })

}
cargarTiposSistemas();
function cargarTiposSistemas(){

  
  $.ajax({
    url: "../processes/mostrar-tipo-sistema.php",
    type: "GET",
    success: function (response) {
      let tipoSistema = JSON.parse(response);
      let template = "";

      tipoSistema.forEach((tipoSistema) => {
        template += `
        
        <option value="${tipoSistema.nombre}">${tipoSistema.nombre}</option>
        
        `;
      });
      $("#cboTipoSistema").html(template);
    }
  })
}

// CARGAR BANDERAAS EN EL FORMULARIO
