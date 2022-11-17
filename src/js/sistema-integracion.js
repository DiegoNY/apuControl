
var editarIntegracion = false;
var editarSistema = false;
var editarRubro = false;
var editarCargo = false;
var editarBanddera = false;
const btnAgregarTipoIntegracion = document.getElementById('btn_agregar_tipo_integracion');
const btnAgregarTipoSistem = document.getElementById('btn_agregar_tipo_sistema');
const btnAgregarRubro = document.getElementById('btn_agregar_rubro');
const btnAgregarCargo = document.getElementById('btnAgregarCargo');
const btnAgregarBandera = document.getElementById('btnRegistrarBandera');
const btnAgregarBandera1 = document.getElementById('btnAgregarBandera');
const btnSalir = document.getElementById("btnSalir");

const eliminarRubro = document.getElementById("btnEliminarRubro");
const eliminarCargo = document.getElementsByClassName("btnEliminarCargo");

const logo = document.getElementById("logo");
const preview_logo = document.getElementById("preview_logo");



const hoy = new Date();

var fechaInput = document.getElementById("txtFecha").value = hoy.toLocaleDateString();
var fechaRubro = document.getElementById("fecha").value = hoy.toLocaleDateString();
var fechaCargo = document.getElementById("fechaCargo").value = hoy.toLocaleDateString();
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

btnRegistrarCargo.addEventListener("click", function () {

  let frmData = new FormData(frmCargo);
  let url =  editarCargo === false ? '../processes/register/registrar-cargos.php':'../processes/edit/editar-cargo.php';
  registrar(frmData, url);
  

})


btnRegistrarRubro.addEventListener("click", function () {

  let frmData = new FormData(frmRubro);
  let url = editarRubro === false ? '../processes/register/registrar-rubro.php':'../processes/edit/editar-rubro.php';
  registrar(frmData, url);

})


function registrar(data, urlAPI) {

  postData(urlAPI, data)
    .then(data => data.json())
    .then(response => {

      mensajes(response);
      cargarInfo("../processes/mostrar-rubros.php","idRubro","listadoRubro", "btnEliminarRubro", "btnEditarRubro", "rubro");
      cargarInfo("../processes/mostrar-cargos.php", "idCargo","listadoCargo", "btnEliminarCargo", "btnEditarCargo", "cargo");
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

cargarInfo("../processes/mostrar-rubros.php","idRubro","listadoRubro", "btnEliminarRubro", "btnEditarRubro", "rubro");

cargarInfo("../processes/mostrar-cargos.php", "idCargo","listadoCargo", "btnEliminarCargo", "btnEditarCargo", "cargo");

cargarBandera();

function cargarBandera() {
 try{
  fetch("../processes/mostrar-banderas.php")
    .then(response => response.json())
    .then(data => {

      let template = '';
      
        template = `
        ${data.map(datas => ` 
        
        <tr idBandera="${datas.id}">
        
        <td>${datas.id}</td>
        <td>${datas.nombre}</td>
        <td><img style="heigth:50px; width:150px;" src=".${datas.bandera}"></td>
        <td>

        <i class="bi bi-pencil   text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#bandera" id="btnEditarBanderas"></i>
        <i class="bi bi-x-circle-fill text-danger btnEliminarBanderas"></i>
        
        </td>

      </tr>`).slice().join('')}
       `;
      
       document.getElementById("listadoBanderas").innerHTML = template;


    })

  }catch(e){
    console.warn("Error" + e);
  }

}

function cargarInfo(urlAPI,id, listado, deletes, edits, modal) {
 try{
  fetch(urlAPI)
    .then(response => response.json())
    .then(data => {

      let template = '';
      
        template = `
        ${data.map(datas => ` 
        
        <tr ${id}="${datas.id}">
        
        <td>${datas.id}</td>
        <td>${datas.nombre}</td>
        <td>${datas.fecha}</td>
        <td>

        <i class="bi bi-pencil   text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#${modal}" id="${edits}"></i>
        <i class="bi bi-x-circle-fill text-danger ${deletes}"></i>
        
        </td>

      </tr>`).slice().join('')}
       `;
      
       document.getElementById(listado).innerHTML = template;


    })

  }catch(e){
    console.warn("Error" + e);
  }

}


$(document).on("click", ".btnEliminarCargo",function(){

    let element = (this).parentElement.parentElement;
    
    let id = element.getAttribute("idcargo");

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
  
        $.post("../processes/delete/eliminar-cargo.php", { id }, function (response) {
          console.log(response);
          cargarInfo("../processes/mostrar-cargos.php", "idCargo","listadoCargo", "btnEliminarCargo", "btnEditarCargo", "cargo");
  
        });
  
      }
    })
  

})

$(document).on("click","#btnEditarCargo",function(){

  
  let element = (this).parentElement.parentElement;
    
  let id = element.getAttribute("idcargo");
  console.log(id);
  $.post("../processes/listener/escuchar-cargos.php", { id }, function (response) {
    console.log(response)
    let cargo = JSON.parse(response);
    $("#nombreCargo").val(cargo.nombre);
    $("#fechaCargo").val(cargo.fecha);
    $("#idCargo").val(cargo.id);
    editarCargo = true;
  });


})
$(document).on("click","#btnEditarRubro",function(){

  let element = (this).parentElement.parentElement;
    
  let id = element.getAttribute("idrubro");
  console.log(id);
  $.post("../processes/listener/escuchar-rubros.php", { id }, function (response) {
    console.log(response)
    let rubro = JSON.parse(response);
    $("#nombre").val(rubro.nombre);
    $("#fecha").val(rubro.fecha);
    $("#idRubro").val(rubro.id);
    editarRubro = true;
  });


})
$(document).on("click", ".btnEliminarRubro",function(){

  let element = (this).parentElement.parentElement;
    
  let id = element.getAttribute("idrubro");

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

      $.post("../processes/delete/eliminar-rubro.php", { id }, function (response) {
        console.log(response);
        cargarInfo("../processes/mostrar-rubros.php","idRubro","listadoRubro", "btnEliminarRubro", "btnEditarRubro", "rubro");

      });

    }
  })


})
$(document).on("click","#btnEditarBanderas",function(){

  let element = (this).parentElement.parentElement;
    
  let id = element.getAttribute("idbandera");
  console.log(id);
  $.post("../processes/listener/escuchar-bandera.php", { id }, function (response) {
    console.log(response)
    let bandera = JSON.parse(response);
    $("#nombreBandera").val(bandera.nombre);
    $("#idBandera").val(bandera.id);

    let img = document.querySelector("#preview_logo");
    img.setAttribute("src",`.${bandera.bandera}`);
    
    const urlLogo = document.getElementById("urlLogo");
    urlLogo.value = bandera.bandera;


  });

  editarBanddera = true;


})
$(document).on("click", ".btnEliminarBanderas",function(){

  let element = (this).parentElement.parentElement;
    
  let id = element.getAttribute("idbandera");

  Swal.fire({
    title: `<i class="bi bi-exclamation-diamond-fill"></i>`,
    icon: '',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

      $.post("../processes/delete/eliminar-bandera.php", { id }, function (response) {
        console.log(response);
        cargarBandera();

      });

    }
  })


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

btnAgregarRubro.addEventListener("click", function () {

  editarRubro = false;
  document.getElementById('frmRubro').reset();

})

btnAgregarCargo.addEventListener("click", function () {

  editarCargo = false;
  document.getElementById('frmCargo').reset();

})

btnAgregarBandera.addEventListener("click", function(){

  registrarBandera();

})

btnAgregarBandera1.addEventListener("click",function(){

  editarBanddera = false;
  document.getElementById('frmBandera').reset();
  
  document.getElementById('preview_logo').setAttribute("src","");

})

logo.addEventListener("change", () => {


  const archivos = logo.files;
  
  if (!archivos || !archivos.length) {

    preview.src = "";
    return;

  }

  const primerArchivo = archivos[0];
  const objURL = URL.createObjectURL(primerArchivo);

  preview_logo.src = objURL;

  const urlLogoEdit = document.getElementById("urlLogo").value || null;
  
  urlComparar = "./img/"+ primerArchivo.name;

  if(urlComparar === urlLogoEdit ){
      
    const edi = document.getElementById("editarLogo");
    edi.value = "no editar";

  }else{ 
    

    const edi = document.getElementById("editarLogo");
    edi.value = "editar";
 
  }

});


function registrarBandera(){
  let url = editarBanddera === false ? "../processes/register/registrar-bandera.php":"../processes/edit/editar-bandera.php"
  let frm = document.querySelector("#frmBandera");
  let dataFrm = new FormData(frm);
 
  $.ajax({
    url: url,
    data: dataFrm,
    cache: false,
    processData: false,
    contentType: false,
    type: "post",
    success: function (response) {
      console.log(response);
      mensajes(
        response,
        "Ok, se registro la bandera",
        "Te falta llenar algunos datos importantes ☹"
      );
      cargarBandera();
      
     editarBanddera = false;
    },
  });
  

}