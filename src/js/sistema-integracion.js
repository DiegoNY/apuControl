
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

let editar = false;

const MODULO = 3;

const btnAgregarGrupo = document.getElementById("btn_agregar_grupo");


const hoy = new Date();

var fechaInput = document.getElementById("txtFechCre").value = hoy.toLocaleDateString();

var fechaInput = document.getElementById("txtFecha").value = hoy.toLocaleDateString();
var fechaRubro = document.getElementById("fechaRubro").value = hoy.toLocaleDateString();
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

        let use = nombre.usuario[1];


        var permiso = false;
        var modulosAcceder = []
        nombre.usuario.permisos.forEach(permisos => {

          if (permisos.modulo == MODULO) permiso = true;

          modulosAcceder.push(permisos.modulo);

        })

        if (!permiso) window.location.replace('../processes/validator/CargaModulosPermitidos.php');

        let MantenimientoEmpresa = false;
        let listadoContactos = false
        let sistema = false
        let ListadoEmpresa = false
        let registro = false

        modulosAcceder.forEach(modulos => {

          switch (true) {

            case modulos == 1:

              MantenimientoEmpresa = CrearMenuItem('index.html', 'registrarEmpresa', 'fi fi-rr-building', 'Mantenimiento Empresa');

              break;

            case modulos == 2:

              listadoContactos = CrearMenuItem('vista-contactos.html', 'detalleContacto', 'bi bi-person-rolodex', 'Listado contactos');


              break;

            case modulos == 3:

              sistema = CrearMenuItem('vista-registro-sistemas.html', 'registrarInformacionSistema', 'bi bi-archive', ' Mantenimiento de Sistema ', true)



              break;

            case modulos == 4:

              ListadoEmpresa = CrearMenuItem('vista-empresa.html', 'detalleContacto', 'icon-home4', 'Listado de Empresa');
              break;

            case modulos == 5:

              registro = CrearMenuItem('registro-usuarios.html', 'registroUsuario', 'bi bi-person-plus', 'Registrar usuario');
              break;


            default:
              console.log("default");
              break;

          }
        })

        let menu = document.querySelector('#navigationMenu');
        menu.innerHTML = '';
        let subMenus = CrearSubMenu('Sistema', 'icon-copy');

        if (ListadoEmpresa)
          menu.appendChild(ListadoEmpresa);
        if (listadoContactos)
          menu.appendChild(listadoContactos);

        menu.appendChild(subMenus);


        /**
         * nav-item-open / display block cuando se de click 
         */

        let subMenu = document.querySelector('#subMenu');

        if (MantenimientoEmpresa)
          subMenu.appendChild(MantenimientoEmpresa);
        if (sistema)
          subMenu.appendChild(sistema);
        if (registro)
          subMenu.appendChild(registro);


        /**
        * Lazy loading
        */

        let conteinerNombreUsuario1 = document.getElementById('nombreUsuario');
        conteinerNombreUsuario1.classList.remove('container-nombre-usuario');
        conteinerNombreUsuario1.innerText = ` ${usuario}`;

        let conteinerNombreUsuario2 = document.querySelector('#nombreUsuarioNav');
        conteinerNombreUsuario2.classList.remove('container-nombre-usuario')
        conteinerNombreUsuario2.innerText = ` ${usuario}`;
      }


      ValidadorModulo(MODULO);


      document.querySelector('#subMenuss').addEventListener('click', () => {
        let subMenu = document.querySelector('#subMenuss');
        let subMenuSubMenu = document.querySelector('#subMenu');

        let estaAbierto = document.querySelector('#subMenuss').classList.contains('nav-item-open');
        console.log(subMenu);

        if (!estaAbierto) {
          subMenu.classList.add('nav-item-open');
          subMenuSubMenu.setAttribute('style', 'display:block;');

        } else {
          subMenu.classList.remove('nav-item-open');
          subMenuSubMenu.setAttribute('style', 'display:none;');

        }

      })

    });

})()


/**
 * UI toggle SubMenu
 */



function CrearMenuItem(links, idNavigation, icono, texto, activo = false) {

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


  return navigation;
}

function CrearSubMenu(nombreSubMenu, iconoSubMenu) {


  let contenedor = document.createElement('li');
  contenedor.setAttribute('class', 'nav-item nav-item-submenu')
  contenedor.setAttribute('id', 'subMenuss');

  let nombre = document.createElement('a');
  nombre.setAttribute('class', 'nav-link');
  let icono = document.createElement('i');
  icono.setAttribute('class', iconoSubMenu);
  let span = document.createElement('span');
  span.innerText = nombreSubMenu
  nombre.appendChild(icono);
  nombre.appendChild(span);

  let ul = document.createElement('ul');
  ul.setAttribute('class', 'nav nav-group-sub')
  ul.setAttribute('style', 'display:none;')
  ul.setAttribute('data-submenu-title', 'Layouts')
  ul.setAttribute('id', 'subMenu');

  contenedor.appendChild(nombre);
  contenedor.appendChild(ul);

  return contenedor;


}

function ValidadorModulo(nmrModulo) {
  let arrModulos = [1, 3, 5]
  let estaDentroUnSubmenu = arrModulos.find(element => element == nmrModulo);
  let subMenuSubMenu = document.querySelector('#subMenu');
  let subMenu = document.querySelector('#subMenuss');



  if (estaDentroUnSubmenu) {

    subMenu.classList.add('nav-item-open');
    subMenuSubMenu.setAttribute('style', 'display:block;');

  }

}


var modalFormularioTipoIntegracion = new bootstrap.Modal(document.getElementById('tipo-integracion'), {
  keyboard: false
})
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

      if (data === "ingresado") {

        modalFormularioTipoIntegracion.toggle();

      }


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
          <i class="fi fi-rr-edit ml-2 mr-2 text-primary btn-editar-tipoIntegracion  text-center text-primary " data-bs-toggle="modal"
          data-bs-target="#tipo-integracion"></i>
          <i class="fi fi-rr-trash text-danger text-danger btn-delete-tipoIntegracion" ></i>
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

var modalFormularioTipoSistema = new bootstrap.Modal(document.getElementById('tipo-sistema'), {
  keyboard: false
})

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

      if (data === "ingresado") {

        modalFormularioTipoSistema.toggle();

      }
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
              class="gridjs-td">${tipoSistema.descripcion}</td>
          <td data-column-id="producer"
              class="gridjs-td">${tipoSistema.fecha}</td>
          <td>
          <i class="fi fi-rr-edit ml-2 mr-2 text-primary btn-editar-tipoSistema  text-center text-primary " data-bs-toggle="modal"
          data-bs-target="#tipo-sistema"></i>
          <i class="fi fi-rr-trash text-danger text-danger btn-delete-tipoSistema" ></i>
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
  let url = editarCargo === false ? '../processes/register/registrar-cargos.php' : '../processes/edit/editar-cargo.php';
  registrar(frmData, url);


})


btnRegistrarRubro.addEventListener("click", function () {

  let frmData = new FormData(frmRubro);
  let url = editarRubro === false ? '../processes/register/registrar-rubro.php' : '../processes/edit/editar-rubro.php';
  registrar(frmData, url);

})

var modalFormularioRubro = new bootstrap.Modal(document.getElementById('cargo'), {
  keyboard: false
})

var modalFormularioCargos = new bootstrap.Modal(document.getElementById('rubro'), {
  keyboard: false
})


function registrar(data, urlAPI) {

  postData(urlAPI, data)
    .then(data => data.json())
    .then(response => {

      mensajes(response);
      cargarInfo("../processes/mostrar-rubros.php", "idRubro", "listadoRubro", "btnEliminarRubro", "btnEditarRubro", "rubro");
      cargarInfo("../processes/mostrar-cargos.php", "idCargo", "listadoCargo", "btnEliminarCargo", "btnEditarCargo", "cargo");

      if (response === "ingresado") {

        let modal = document.getElementById("cargo");


        let isShowModal = modal.classList.contains("show");



        if (!isShowModal) {

          modalFormularioCargos.toggle();

        } else {

          modalFormularioRubro.toggle();

        }

      }

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

cargarInfo("../processes/mostrar-rubros.php", "idRubro", "listadoRubro", "btnEliminarRubro", "btnEditarRubro", "rubro");

cargarInfo("../processes/mostrar-cargos.php", "idCargo", "listadoCargo", "btnEliminarCargo", "btnEditarCargo", "cargo");

cargarBandera();

function cargarBandera() {
  try {
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

        <i class="fi fi-rr-edit ml-2 mr-2 text-primary   text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#bandera" id="btnEditarBanderas"></i>
        <i class="fi fi-rr-trash text-danger text-danger btnEliminarBanderas"></i>
        
        </td>

      </tr>`).slice().join('')}
       `;

        document.getElementById("listadoBanderas").innerHTML = template;


      })

  } catch (e) {
    console.warn("Error" + e);
  }

}

function cargarInfo(urlAPI, id, listado, deletes, edits, modal) {
  try {
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

        <i class="fi fi-rr-edit ml-2 mr-2 text-primary   text-center text-primary " data-bs-toggle="modal"
        data-bs-target="#${modal}" id="${edits}"></i>
        <i class="fi fi-rr-trash text-danger text-danger ${deletes}"></i>
        
        </td>

      </tr>`).slice().join('')}
       `;

        document.getElementById(listado).innerHTML = template;


      })

  } catch (e) {
    console.warn("Error" + e);
  }

}


$(document).on("click", ".btnEliminarCargo", function () {

  let element = (this).parentElement.parentElement;

  let id = element.getAttribute("idcargo");

  Swal.fire({
    title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' /> `,
    text: `Estas serguro de eliminarlo? `,
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
        cargarInfo("../processes/mostrar-cargos.php", "idCargo", "listadoCargo", "btnEliminarCargo", "btnEditarCargo", "cargo");

      });

    }
  })


})

$(document).on("click", "#btnEditarCargo", function () {


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
$(document).on("click", "#btnEditarRubro", function () {

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
$(document).on("click", ".btnEliminarRubro", function () {

  let element = (this).parentElement.parentElement;

  let id = element.getAttribute("idrubro");

  Swal.fire({
    title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' /> `,
    icon: '',
    text: 'Estas seguro de eliminarlo ?',
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
        cargarInfo("../processes/mostrar-rubros.php", "idRubro", "listadoRubro", "btnEliminarRubro", "btnEditarRubro", "rubro");

      });

    }
  })


})
$(document).on("click", "#btnEditarBanderas", function () {

  let element = (this).parentElement.parentElement;

  let id = element.getAttribute("idbandera");
  console.log(id);
  $.post("../processes/listener/escuchar-bandera.php", { id }, function (response) {
    console.log(response)
    let bandera = JSON.parse(response);
    $("#nombreBandera").val(bandera.nombre);
    $("#idBandera").val(bandera.id);

    let img = document.querySelector("#preview_logo");
    img.setAttribute("src", `.${bandera.bandera}`);

    const urlLogo = document.getElementById("urlLogo");
    urlLogo.value = bandera.bandera;


  });

  editarBanddera = true;


})
$(document).on("click", ".btnEliminarBanderas", function () {

  let element = (this).parentElement.parentElement;

  let id = element.getAttribute("idbandera");

  Swal.fire({
    title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' /> `,
    icon: '',
    text: 'Estas seguro de eliminarlo',
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
    title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' /> `,
    icon: '',
    text: 'Estas seguro de eliminarlo ?',
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
    $("#txtEstado").val(tipoSistema.estado);
    $("#txtProveedor").val(tipoSistema.proveedor);
    $("#txtFecha").val(tipoSistema.fecha);

    document.querySelector('#txtNombre').value = tipoSistema.nombre;
    document.querySelector('#descripcion').value = tipoSistema.descripcion;

    editarSistema = true;
    mostrarTiposSistema();
  });

})

$(document).on("click", ".btn-delete-tipoIntegracion", async function () {


  let element = (this).parentElement.parentElement;
  let id = element.getAttribute("id_grupo");
  console.log(id);


  Swal.fire({
    title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' /> `,
    icon: '',
    text: 'Estas seguro de eliminarlo?',
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
  let fechaIntegracion = document.getElementById("txtFechaIntegracion");
  fechaIntegracion.value = hoy.toLocaleDateString();
  document.getElementById('frm_tipo_integracion').reset();


})

btnAgregarTipoSistem.addEventListener('click', function () {

  editarSistema = false;

  document.getElementById('frm_tipo_sistema').reset();
  $("#txtFecha").val(hoy.toLocaleDateString());

})

btnSalir.addEventListener("click", async function () {


  fetch('../processes/validator/terminar-sesion.php');

})

btnAgregarRubro.addEventListener("click", function () {

  editarRubro = false;
  document.getElementById('frmRubro').reset();
  let fechaRubros = document.getElementById("fechaRubro");
  fechaRubros.value = hoy.toLocaleDateString();

})

btnAgregarCargo.addEventListener("click", function () {

  editarCargo = false;
  document.getElementById('frmCargo').reset();
  let fechaCargo = document.getElementById("fechaCargo");
  fechaCargo.value = hoy.toLocaleDateString();

})

btnAgregarBandera.addEventListener("click", function () {

  registrarBandera();

})

btnAgregarBandera1.addEventListener("click", function () {

  editarBanddera = false;
  document.getElementById('frmBandera').reset();

  document.getElementById('preview_logo').setAttribute("src", "");

  let fechaBandera = document.getElementById("fechaBandera");
  fechaBandera.value = hoy.toLocaleDateString();

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

  urlComparar = "./img/" + primerArchivo.name;

  if (urlComparar === urlLogoEdit) {

    const edi = document.getElementById("editarLogo");
    edi.value = "no editar";

  } else {


    const edi = document.getElementById("editarLogo");
    edi.value = "editar";

  }

});

var modalFormularioBandera = new bootstrap.Modal(document.getElementById('bandera'), {
  keyboard: false
})

function registrarBandera() {
  let url = editarBanddera === false ? "../processes/register/registrar-bandera.php" : "../processes/edit/editar-bandera.php"
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

      if (response === "ingresado") {

        modalFormularioBandera.toggle();

      }
    },
  });


}



$(document).ready(function () {



  $(document).on("click", ".btn-delete-grupo", function () {


    let element = (this).parentElement.parentElement;
    let id = element.getAttribute("id_grupo");
    console.log(id);


    Swal.fire({

      title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' />`,
      icon: '',
      text: 'Estas seguro de eliminarlo?',
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
      $("#txtNombreGru").val(grupo.nombre);
      $("#txtDescripcion").val(grupo.descripcion);
      $("#txtUsuCre").val(grupo.usuarioCreacion);


      editar = true;
      mostrarGrupos();

    });

  })

  btnAgregarGrupo.addEventListener("click", function () {


    editar = false;
    document.getElementById('frm_grupo').reset();


  })

  btnSalir.addEventListener("click", async function () {


    fetch('../processes/validator/terminar-sesion.php');

  })

})


function RegistrarGrupo() {
  let url = editar === false ? "../processes/register/procesarGrupo.php" : "../processes/edit/editar-grupo.php";
  $.ajax({
    type: "GET",
    data: $("#frm_grupo").serialize(),
    url: url,
    success: function (data) {
      mensajes(data, "Se registro el grupo 🐱‍👤", "Rellena todos los campos");
      mostrarGrupos();
    },
  });
  $("#frm_grupo").trigger("reset");

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
          <i  class=" btn-editar-grupo  text-center fi fi-rr-edit ml-2 mr-2 text-primary" data-bs-toggle="modal"
          data-bs-target="#grupo"></i>
          <i class="fi fi-rr-trash text-danger text-danger btn-delete-grupo" ></i>
          </td>
      </tr>
     
          
          `;
      });
      $("#listado_grupos").html(template);
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