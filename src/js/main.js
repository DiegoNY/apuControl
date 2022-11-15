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
var razon_so = document.getElementById("txtRazonSocial");
var rucIdSU = document.getElementById("ruc_id_su");
const btnes = document.getElementById("btn_reset");
const btnAgregarContacto = document.getElementById("btn_reset_contacto");
const btnSalir = document.getElementById("btnSalir");

const logo = document.getElementById("logo");
const preview_logo = document.getElementById("preview_logo");

const banderaSucursal = document.getElementById("logoSu")
const previewBandera = document.getElementById("preview_logo_su");

const hoy = new Date();

var fechaInput = document.getElementById("txtFechaRegistro").value = hoy.toLocaleDateString();

//se llama al usuario logueado
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



// SE RECIBEN ESTOS VALORES PARA ACTIVAR EL PROCESO DE EDICION DE LA EMPRESA ^_^  
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get("id");
let edit = urlParams.get("edit");
let rucs = urlParams.get("ruc");
const btn_registrar_empresa = document.getElementById("btn_registrar");
const ides = document.querySelector("#txtIdSucursal");

if (!rucs) {
} else {
  document.getElementById("ruc_id").value = rucs;
}



function cargarSucursal(ruc) {
  tableSucursal.destroy();
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
        defaultContent: `<div class="contenedor-iconos"><i class="bi bi-pencil-square text-warning btn-edit-sucursal" data-bs-toggle="modal" data-bs-target="#sucursal"></i>
                          <i class="bi bi-x-circle-fill text-danger btn-delete-sucursal" ></i>
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
    destroy: true,
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
        defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-contacto" data-bs-toggle="modal"
        data-bs-target="#contactos"></i>
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

function cargarAccesos(id) {


  $.post("../processes/mostrar-accesos.php", { id }, function (response) {

    let accesos = JSON.parse(response);


    let teamViewer = accesos['data'][0];
    console.log(teamViewer);
    let anydes = accesos['data'][1];

    let escritorioRemoto = accesos['data'][2];


    $("#id_TV").val(teamViewer['id']);
    $("#usuariosa").val(teamViewer['idAcceso']);
    $("#contraseñaa").val(teamViewer['contrasena']);

    $("#id_ANY").val(anydes['id']);
    $("#usuario_ANY").val(anydes['idAcceso']);
    $("#contraseña_ANY").val(anydes['contrasena']);

    $("#id_ER").val(escritorioRemoto['id']);
    $("#usuario_ER").val(escritorioRemoto['idAcceso']);
    $("#contraseña_ER").val(escritorioRemoto['contrasena']);


    editarAcceso = true;


  });




}

// ALERTAS //

function mensajes(response, mensaje, error) {

  if (response == "ingresado") {
    Swal.fire("REGISTRADA", ``, "success").then(() => {
      console.log("tabla actualizada");
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
  let frm = document.getElementById("frm-sucursal");
  frmData = new FormData(frm);

  $.ajax({
    url: url,
    data: frmData,
    cache: false,
    processData: false,
    contentType: false,
    type: "post",
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

      mensajes(response, "Contacto Registrado", "Rellena todos los campos ❌");
      editarContacto = false;
      tablaContactos.ajax.reload();
    },
  });
  $("#frm-contactos").trigger("reset");
}

//para los grupos


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


function editarEmpresas(id, edit) {

  if (id == null)
    return;

  datosCompletosEmpresa(id);

}


function RegistrarEmpresa() {


  let url = editar === false ? "../processes/register/registrar-empresa.php" : "../processes/edit/editar-empresa.php";
  let frm = document.getElementById("frm_empresa");
  let frmdata = new FormData(frm);

  $.ajax({
    method: "post",
    url: url,
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
          "EMPRESA INGRESADA",
          "LA EMPRESA YA EXISTE"
        );



        if (data.mensaje === "ingresado") {
          console.log("entre")
          cargarSucursal(data.ruc);
          cargarContactos(data.ruc);

        } else {

          console.log("entre aca")

        }

        ruc_id.value = data.ruc;
        rucIdSU.value = data.ruc;
      });
    },
  });
}

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
    $("#txtFechaRegistro").val(empresa.fecha_registro);
    $("#txtEstadoComercial").val(empresa.estado_comercial);
    $("#cboTipoPersona").val(empresa.tipo_persona);
    $("#cboEstado").val(empresa.estado);
    $("#proveedor").val(empresa.proveedor);
    rucIdSU.value = empresa.ruc;

    preview_logo.setAttribute("src",`.${empresa.img}`);

    let opcionTipoIntegra = document.getElementById(`${empresa.id_tipo_integracion}`);
    
    opcionTipoIntegra.setAttribute("selected","true");

    cargarUbigeoEmpresa(empresa.id_ubigeo);


    editar = edit;
    tableSucursal.destroy;
    tablaContactos.destroy;
    cargarSucursal(empresa.ruc);
    cargarContactos(empresa.ruc);
    mostrarLogoss(empresa.ruc);


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
            console.log(ubigeo_option);
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


function cargarTipointegracion() {

  $.ajax({
    url: "../processes/mostrar-tipo-integracion.php",
    type: "GET",
    success:  function (response) {
   
      let tipoIntegra =  JSON.parse(response);
      let template = "";

      tipoIntegra.forEach((tipoIntegra) => {
        template += `
        
        <option id="${tipoIntegra.nombre}" value="${tipoIntegra.nombre}">${tipoIntegra.nombre}</option>
        
        `;
      });
      $("#cboIdTipoIntegracion").html(template);
    }
  })

}

function cargarTiposSistemas() {


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

function cargarUbigeoEmpresa(id) {

  $.ajax({
    url: "../processes/mostrar-ubigeo.php",
    type: "GET",
    success: function (response) {
      let ubigeo = JSON.parse(response);
      let template = "";
      ubigeo.forEach((ubigeo) => {
        template += `

        <option id="${ubigeo.ubigeo}" value="${ubigeo.ubigeo}" >${ubigeo.distrito}</option>

        `;
      });
      $("#cboIdu").html(template);
      $("#cboIdub").html(template);

      let ub = document.getElementById(id);
      ub.setAttribute("selected", "true");
    },
  });

}
// previsualizacion de logo :o

previewImgenes(logo, preview_logo);
previewImgenes(banderaSucursal, previewBandera);

function previewImgenes(img, preview) {

  img.addEventListener("change", () => {


    const archivos = img.files;

    if (!archivos || !archivos.length) {

      preview.src = "";
      return;

    }

    const primerArchivo = archivos[0];
    const objURL = URL.createObjectURL(primerArchivo);

    preview.src = objURL;

  });


}

cargarTiposSistemas();
cargaGrupoEnFrm();
cargarTipointegracion();
/**
 *  
 * @param id = el parametreo que se recibe por GET 
 * 
 * *una vez recibido el paramertro valida si no es null para 
 * *para poder ejecutarce asi evitando error de JSON 🙈
 *
 */
editarEmpresas(id, edit);




$.ajax({
  url: "../processes/mostrar-ubigeo.php",
  type: "GET",
  success: function (response) {
    let ubigeo = JSON.parse(response);
    let template = "";
    ubigeo.forEach((ubigeo) => {
      template += `

        <option id="${ubigeo.ubigeo}" value="${ubigeo.ubigeo}" >${ubigeo.distrito}</option>

        `;
    });
    $("#cboIdu").html(template);
    $("#cboIdub").html(template);
  },
});


$(document).ready(function () {


  tableSucursal = $("#tabla_sucursals").DataTable({
    destroy: true,
    "paging": true,
    
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


})


//BOTONES ಠ_ಠ


$(document).on("click", ".btn-edit-sucursal", function () {

  let data = tableSucursal.row($(this).parents()).data();
  let id = data.id;

  $("#txtIdSucursa").val(id);

  $.post("../processes/listener/escuchar-sucursal.php", { id }, function (response) {

    let sucursal = JSON.parse(response);
    console.log(sucursal);

    $("#id-sucursal").val(sucursal.id);
    $("#txtNombreSucursal").val(sucursal.nombre);
    $("#txtDireccionSucursal").val(sucursal.direccion);
    $("#txtCodigoCofide").val(sucursal.codigo_cofide);
    $("#cboIdub").val(sucursal.ubigeo);
    $("#txtIdEmpresa").val(sucursal.id_empresa);

    //ub = document.getElementById(`${sucursal.ubigeo}`).value;
    //console.log(ub);

    editarSucursall = true;
    ides.value = sucursal.id;

    cargarAccesos(id);

  });

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
    editarAcceso = false;
    //cargando los datos al frm de acceso se hara con un btn
    $("#txtIdSucursale").val(ideSuc);
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

$(document).on("click", "#btn_ruc", function () {

  let ruc = $("#txtRuc").val();
  validarRuc(ruc);

})


btnes.addEventListener("click", function () {

  editarSucursall = false;
  document.getElementById('frm-sucursal').reset();
}
)

btnAgregarContacto.addEventListener("click", function () {

  editarContacto = false;
  document.getElementById('frm-contactos').reset();

})

btnSalir.addEventListener("click", async function () {


  fetch('../processes/validator/terminar-sesion.php');

})



//validando email 
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// si el email es valido el boton de enviar se activa 
const validate = () => {

  const email = $('#correo-contacto').val();

  if (validateEmail(email)) {

    let enviaContacto = document.getElementById("btnEnviarContacto");
    enviaContacto.removeAttribute("disabled");
  } else {
    let enviaContacto = document.getElementById("btnEnviarContacto");

    enviaContacto.setAttribute("disabled","");

  }
  return false;
}

$('#correo-contacto').on('input', validate);
