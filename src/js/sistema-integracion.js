
var editarIntegracion = false;
var editarSistema = false;
const btnAgregarTipoIntegracion = document.getElementById('btn_agregar_tipo_integracion');
const btnAgregarTipoSistem = document.getElementById('btn_agregar_tipo_sistema');
const btnAgregarRubro = document.getElementById('btn_agregar_rubro');
const btnAgregarCargo = document.getElementById('btnAgregarCargo');

const btnSalir = document.getElementById("btnSalir");


const hoy = new Date();

var fechaInput = document.getElementById("txtFecha").value = hoy.toLocaleDateString();
var frmRubro = document.getElementById("frmRubro");
var frmCargo = document.getElementById("frmCargo");
var btnRegistrarRubro = document.getElementById("btnRegistraRubro");
var btnRegistrarCargo = document.getElementById("btnRegistrarCargos");

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




function registrarTipoIntegracion() {

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
function mostrarTipoIntegracion() {

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
function cargarTipointegracion() {

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


function registrarTipoSistema() {

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

function mostrarTiposSistema() {

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

btnRegistrarCargo.addEventListener("click",function(){

  let frmData = new FormData(frmCargo);

  registrar(frmData,'../processes/register/restrar-cargos.php');


})


btnRegistrarRubro.addEventListener("click",function(){

  let frmData = new FormData(frmRubro);

  registrar(frmData,'../processes/register/registrar-rubro.php');


})


function registrar(data,urlAPI){

  postData(urlAPI,data)
    .then(data => data.json())
    .then(response => {

      mensajes(response);

    });

}


function postData(urlAPI, data) {
    
  const response = fetch(urlAPI,
      {
          method: 'POST',
          body: data,
      }
  );

  return response;

}


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
    $("#txtProveedor").val(tipoSistema.proveedor);
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

btnAgregarTipoIntegracion.addEventListener('click', function () {

  editarIntegracion = false;

  document.getElementById('frm_tipo_integracion').reset();


})

btnAgregarTipoSistem.addEventListener('click', function () {

  editarSistema = false;

  document.getElementById('frm_tipo_sistema').reset();


})

btnSalir.addEventListener("click", async function () {


  fetch('../processes/validator/terminar-sesion.php');

})

btnAgregarRubro.addEventListener("click",function(){

  frmRubro.reset();

})
