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
const banderaSucursal = document.getElementById("logoSu");
const previewBandera = document.getElementById("preview_logo_su");

const MODULO = 1;

const hoy = new Date();

var fechaInput = document.getElementById("txtFechaRegistro").value = hoy.toLocaleDateString();

var fechaCargo = document.getElementById("fechaCargo").value = hoy.toLocaleDateString();

var urlEscucharEmpresaRegistrar = false;


//se llama al usuario logueado
(() => {

  fetch('../processes/pruebaSession.php')
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

        let menu = document.querySelector('#navigationMenu');
        modulosAcceder.forEach(modulos => {

          switch (true) {
            case modulos == 1:


              let navigation1 = document.createElement('li');
              navigation1.setAttribute('class', 'nav-item');
              navigation1.setAttribute('id', 'registrarEmpresa');
              let link1 = document.createElement('a');
              link1.setAttribute('href', 'index.html');
              link1.setAttribute('class', 'nav-link active');
              let img1 = document.createElement('i');
              img1.setAttribute('class', 'bi bi-bookmark-plus');
              let span1 = document.createElement('span');
              span1.innerText = ' Registrar Empresas';

              link1.appendChild(img1);
              link1.appendChild(span1);

              navigation1.appendChild(link1);

              menu.appendChild(navigation1);

              break;
            case modulos == 2:

              let navigation3 = document.createElement('li');
              navigation3.setAttribute('class', 'nav-item');
              navigation3.setAttribute('id', 'detalleContacto');
              let link3 = document.createElement('a');
              link3.setAttribute('href', 'vista-contactos.html');
              link3.setAttribute('class', 'nav-link');
              let img3 = document.createElement('i');
              img3.setAttribute('class', 'bi bi-person-rolodex');
              let span3 = document.createElement('span');
              span3.innerText = '   Detalle contactos  ';

              link3.appendChild(img3);
              link3.appendChild(span3);

              navigation3.appendChild(link3);

              menu.appendChild(navigation3);


              console.log('Acceso' + modulos)

              break;

            case modulos == 3:



              let navigation2 = document.createElement('li');
              navigation2.setAttribute('class', 'nav-item');
              navigation2.setAttribute('id', 'registrarInformacionSistema');
              let link2 = document.createElement('a');
              link2.setAttribute('href', 'vista-registro-sistemas.html');
              link2.setAttribute('class', 'nav-link');
              let img2 = document.createElement('i');
              img2.setAttribute('class', 'bi bi-archive');
              let span2 = document.createElement('span');
              span2.innerText = '  Informacion del Sistema ';

              link2.appendChild(img2);
              link2.appendChild(span2);

              navigation2.appendChild(link2);

              menu.appendChild(navigation2);

              console.log('Acceso' + modulos)

              break;

            case modulos == 4:

              let navigation4 = document.createElement('li');
              navigation4.setAttribute('class', 'nav-item');
              navigation4.setAttribute('id', 'detalleContacto');
              let link4 = document.createElement('a');
              link4.setAttribute('href', 'vista-empresa.html');
              link4.setAttribute('class', 'nav-link');
              let img4 = document.createElement('i');
              img4.setAttribute('class', 'icon-home4');
              let span4 = document.createElement('span');
              span4.innerText = '   Listar Empresa  ';

              link4.appendChild(img4);
              link4.appendChild(span4);

              navigation4.appendChild(link4);

              menu.appendChild(navigation4);


              console.log('Acceso' + modulos)

              console.log('Acceso' + modulos)

              break;

            default:
              console.log("default");
              break;

          }
        })


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
const inputRuc = document.getElementById("txtRuc");


if (!rucs) {
} else {
  document.getElementById("ruc_id").value = rucs;
}

cargarUbigeo();

async function cargarUbigeo() {
  await $.ajax({
    url: "../processes/mostrar-ubigeo.php",
    type: "GET",
    success: function (response) {
      let ubigeo = JSON.parse(response);
      //console.table(response);
      let template = "<option value='0' > SELECCIONE </option>";
      ubigeo.forEach((ubigeo) => {
        template += `

      <option id="${ubigeo.ubigeo}" value="${ubigeo.ubigeo}" >${ubigeo.departamento} ${ubigeo.provincia} ${ubigeo.distrito} </option>
     

      `;


      });


      $("#cboIdu").html(template);

      $("#cboIdub").html(template);

      $('#cboIdu').selectpicker('refresh');
      $('#cboIdub').selectpicker('refresh');




    },
  });
}



function cargarSucursal(ruc) {
  try {

    tableSucursal.destroy();

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
        loadingRecords: "",
        processing: "Procesando...",
        search: "",
        searchPlaceholder: "Buscar por..",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });

  } catch (e) {

    console.warn("Error" + e + "Solucionando");

    tableSucursal = $("#tabla_sucursals").DataTable({
      destroy: true,
      "scrollCollapse": true,
      "paging": true,
      "order": [[0, 'desc'], [1, 'desc']],
      ajax: "../processes/mostrar-sucursal.php?id=" + ruc,
      columns: [
        {
          data: "id", "render": function (data) {

            return `<input numSucursal="suCuN${data}" type="hidden" value="${data}"> ${data} `

          }
        },
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
}

function cargarContactos(ruc) {

  try {

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
        loadingRecords: "",
        processing: "Procesando...",
        search: "",
        searchPlaceholder: "Buscar por..",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  } catch (e) {

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
    tablaContactos.destroy();

  }
}

let todosLosAccesos = [];
let todosLosSitemas = [];
let Sistema = [];

function cargarAccesos(id) {


  todosLosAccesos = [];
  todosLosSitemas = [];
  Sistema = [];

  $.post("../processes/mostrar-accesos.php", { id }, function (response) {


    let accesos = JSON.parse(response);

    /**
     * Vaciando Accesos
    */

    let inpuAccesosInfo = document.querySelector("#accesosSucursalPorSistema");
    inpuAccesosInfo.setAttribute("value", "");

    /** 
     * Vaciando Array
    */

    template = "";

    accesos['data'].forEach((acceso) => {

      todosLosAccesos.push(

        {
          id: acceso.id,
          sucursal: acceso.id_sucursal,
          sistema: acceso.nombreSistema,
          nombre: acceso.nombreAcceso,
          usuario: acceso.idAcceso,
          contraseña: acceso.contrasena,
        }

      );

      todosLosSitemas.push(

        {
          id: acceso.id_sucursal,
          nombre: acceso.nombreSistema,
          proveedor: acceso.proveedor,
          integracion: acceso.tipoIntegracion

        }

      )



    });


    /**
     * 
     * Obteniendo el sistema los sistemas estan relacionados con el acceso estan en la misma tabla.
     * 
     */

    /**
     * @sisMap crea un array de clave valor con el nombre ya que es el que se repite  
     */

    let SisMap = todosLosSitemas.map(item => {

      return [item.nombre, item]

    });

    /**
     * @sisMapArr Se eliminan los obj repetidos 
     */
    var sisMapArr = new Map(SisMap);



    let sistemasss = [...sisMapArr.values()];

    console.log(sistemasss);

    template = "";

    sistemasss.forEach(sistema => {

      template += `

    <tr idSucursalSistema = "${sistema.id}" sistema="${sistema.nombre}">
      <td> ${sistema.nombre} </td>
      <td integracion="${sistema.integracion}"> ${sistema.integracion} </td>
      <td> ${sistema.proveedor} </td>
      <td class="text-center"> <i class="bi bi-pencil-square" id="editarSistema"></i> <i class="bi bi-trash3" id="eliminarSistema"></i></td>
    </tr>
    
    `;
    });

    let containerSistema = document.getElementById("containerSistemas");
    containerSistema.innerHTML = template;

    editarAcceso = true;


  });




}

// mensajes dependiendo el registro se mostraran dotos  //

function mensajes(response, ruc, error) {

  if (response == "ingresado") {

    Swal.fire("REGISTRADA", ``, "success").then(() => {

      //SE HACE ALGO 
      console.log("tabla actualizada");

    });

  } else if (response == "existe") {

    urlEscucharEmpresaRegistrar = true;

    Swal.fire("EMPRESA YA REGISTRADA", `EDITAR DATOS`, "error").then(() => {

      console.log("no hay datos");

      console.log(ruc);

      editarEmpresas(ruc, true);

    });

  } else if (response == "ingresoempresa") {

    Swal.fire("REGISTRADA", ``, "success").then(() => {

      //SE HACE ALGO 
      console.log("tabla actualizada");
      editar = true;

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

      let template = " ";

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
      mensajes(response, "Bien Se ingresaron los accesos 😀", "Completa Todos los campos");
      editarAcceso = false;
      tablaAccesos.ajax.reload();
    },

  });

  $("#frm-accesos").trigger("reset");

}


var modalFormularioSucursal = new bootstrap.Modal(document.getElementById('sucursal'), {
  keyboard: false
})

/**
 * 
 * @registrarSucursal sirve para registrar y editar 
 * 
 */

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

      if (response === "ingresado") {
        modalFormularioSucursal.toggle();
      } else {

        TieneValores('#txtNombreSucursal');
        TieneValores('#txtDireccionSucursal');
        

        let sistemas = document.querySelector('#containerSistemas').children;
        let containerTablaSistemas = document.querySelector('#previsualizacion-sistemas');
        let containerTablaAccesos = document.querySelector('.container-accesos');
        let btnAcceso = document.querySelector('#accesoSucursal-tab');
        let accesos = document.querySelector('#contenedorAccesos').children;



        if (sistemas.length == 0) containerTablaSistemas.classList.add('campo-faltante');
        if (accesos.length == 0) containerTablaAccesos.classList.add('campo-faltante');
        if (accesos.length == 0) btnAcceso.classList.add('campo-faltante');


        setTimeout(() => {
          containerTablaSistemas.classList.remove('campo-faltante');
          containerTablaAccesos.classList.remove('campo-faltante');
          btnAcceso.classList.remove('campo-faltante');

        }, 7000)


      }

    },
  });

}

//Para los Contactos


var modalFormularioContactos = new bootstrap.Modal(document.getElementById('contactos'), {

  keyboard: false

})


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

      if (response === "ingresado") {

        modalFormularioContactos.toggle();

      } else {
        console.log("faltan datos");

        let nombre = document.querySelector('#nombre-contacto');
        let nombreContainer = document.querySelector('#container-nombre');

        let telefono = document.querySelector('#telefono-contacto').value;
        let telefonoContainer = document.querySelector('#container-telefono');

        let detalle = document.querySelector('#detalleContacto').value;
        let containerDetalle = document.querySelector('#container-detalle');

        if (nombre.value == "") nombreContainer.classList.add('campo-faltante');
        if (telefono == "") telefonoContainer.classList.add('campo-faltante');
        if (detalle == "") containerDetalle.classList.add('campo-faltante');


      }

    },
  });
  $("#frm-contactos").trigger("reset");
}

let nombre = document.querySelector('#nombre-contacto');
nombre.addEventListener('click', () => {
  let nombreContainer = document.querySelector('#container-nombre');
  nombreContainer.classList.remove('campo-faltante');

})

let telefono = document.querySelector('#telefono-contacto');

telefono.addEventListener('click', () => {

  let telefonoContainer = document.querySelector('#container-telefono');
  telefonoContainer.classList.remove('campo-faltante');

})

let detalle = document.querySelector('#detalleContacto');

detalle.addEventListener('click', () => {
  let containerDetalle = document.querySelector('#container-detalle');
  containerDetalle.classList.remove('campo-faltante');



})


async function cargarCargos() {
  return respuesta = await $.ajax({

    url: "../processes/mostrar-cargos.php",
    type: "GET",

    success: function (response) {

      let data = JSON.parse(response);

      let template = "";

      //console.log(data);
      data.forEach((cargos) => {

        template += `

        <option value="${cargos.nombre}">${cargos.nombre}</option>
        
        `

      })
      $("#cargo-contacto").html(template);

    }


  });
}

cargarCargos();

async function cargarRubros() {

  await $.ajax({

    url: "../processes/mostrar-rubros.php",
    type: "GET",

    success: function (response) {

      let data = JSON.parse(response);

      let template = "<option value='0'> SELECCIONE </option>";

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
//para los grupos


function cargaGrupoEnFrm() {
  $.ajax({
    url: "../processes/mostrar-grupo-formulario.php",
    type: "GET",
    success: function (response) {
      let grupos = JSON.parse(response);
      let template = "<option value='---' > SELECCIONE </option>";
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
 * @editarEmpresas 
 * si la empresa pidio ser editada de la vista principal el id es capturado por la url si no la misma funciona es ejecutada pero *
 * por la funcion mensaje pide dos atributos ignorar el edit por ahora ... 
*/

function editarEmpresas(id, edit) {

  if (id == null)
    return;

  editar = true;



  datosCompletosEmpresa(id);
  btnAgregarContacto.removeAttribute("disabled");
  btnes.removeAttribute("disabled");

  let btnValidar = document.getElementById("btn_ruc");
  btnValidar.setAttribute("disabled", "");

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
      let data = JSON.parse(response);


      data.forEach((data) => {

        mensajes(
          data.mensaje,
          data.ruc,
          "LA EMPRESA YA EXISTE"
        );



        if (data.mensaje === "ingresoempresa") {

          btnAgregarContacto.removeAttribute("disabled");
          btnes.removeAttribute("disabled");

          cargarSucursal(data.ruc);
          cargarContactos(data.ruc);

          btn_registrar.value = "Editar";


        } else {

          /**campo-faltante */

          TieneValores('#cboIdRubro', '.container-rubro');
          TieneValores('#txtNombreCo');
          TieneValores('#txtRazonSocial');
          TieneValores('#cboTipoEnvio', '#tipoEnvio');
          TieneValores('#txtDireccion');


        }

        ruc_id.value = data.ruc;
        rucIdSU.value = data.ruc;
      });
    },
  });

}


function datosCompletosEmpresa(id) {

  /**
   *  si la empresa que se registro existe se escuccha la empres apor ruc ya no por el id esta  @urlEscucharEmpresaRegistrar
   * cambia cuando el mensaje es = existe revisar funcion  mensajes()
   * 
   * 
  */
  let url = urlEscucharEmpresaRegistrar === false ? "../processes/listener/escuchar-empresa.php" : "../processes/listener/escuchar-empresa-registro.php"

  $.post(url, { id }, function (response) {
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
    $("#id").val(empresa.id);
    $("#urlLogo").val(empresa.img);
    $("#cboIdu").val(empresa.id_ubigeo);
    $("#contraseñaClaveSol").val(empresa.clavesol);
    $("#usuarioClaveSol").val(empresa.usuarioclavesol);
    rucIdSU.value = empresa.ruc;

    preview_logo.setAttribute("src", `.${empresa.img}`);
    try {

      let opcionTipoIntegra = document.getElementById(`${empresa.id_tipo_integracion}`);

      opcionTipoIntegra.setAttribute("selected", "true");

    } catch (e) {

      console.warn("Error" + e)

    }


    //cargarUbigeoEmpresa(empresa.id_ubigeo);


    editar = edit;
    tableSucursal.destroy;
    tablaContactos.destroy;

    cargarSucursal(empresa.ruc);
    cargarContactos(empresa.ruc);
    mostrarLogoss(empresa.ruc);

    $('.selectpicker').selectpicker("render");

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

        if (data.data == null) return Swal.fire(
          ` Error ( ${data.mensaje}  )`,
          `Verifica que el RUC sea valido en <a href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp" > Validacion RUC Sunat </a>`,
          ''
        );

        let razon = data.data.nombre || "";
        let condicion = data.data.condicion;
        let estado = data.data.estado;
        let ubigeo = data.data.ubigeo;
        let direccion = data.data.direccion || "";
        let error = data.data.error;
        let documento = data.data.numeroDocumento;

        $("#cboIdu").val(ubigeo);


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
            let ubigeo_option = document.getElementById(`${ubigeo}`) || document.getElementById("natu");;
            //seleccionarla
            ubigeo_option.setAttribute("selected", "true");
            $('.selectpicker').selectpicker("render");


            let numeros = documento.split('');

            let primerosNumerosRuc = numeros[0] + numeros[1]

            if (primerosNumerosRuc === "20") {

              let optionDefault = document.getElementById("defaultTipoPersona");
              optionDefault.removeAttribute("selected");

              let tipoPersonaNatu = document.getElementById("juri");
              tipoPersonaNatu.setAttribute("selected", "true");
            } else {

              let optionDefault = document.getElementById("defaultTipoPersona");
              optionDefault.removeAttribute("selected");

              let tipoPersonaNatu = document.getElementById("natu");
              tipoPersonaNatu.setAttribute("selected", "true");
              console.log("NATURAL");
            }

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


        <div class="card-body ">
          
          
          <div class="row d-flex justify-content-center">
           
            <p class=" mb-2 font-size-sm">Estado <span class="badge bg-success text-light">${estado}</span>   Condición <span class="badge bg-info text-light">${condicion}</span></p>

            <p class=" mb-2 font-size-sm"> </p>

          </div>

        </div>


      </div>

    </div>`,
    confirm: 'Sign in',
    focusConfirm: false,

  }).then((result) => {

  })

}


function cargarTipointegracion(nombre = false) {

  $.ajax({
    url: "../processes/mostrar-tipo-integracion.php",
    type: "GET",
    success: function (response) {

      let tipoIntegra = JSON.parse(response);

      let defaults = document.createElement('option');
      defaults.innerText = "SELECCIONE";

      let optiones = [];
      optiones.push(defaults);

      tipoIntegra.forEach((tipoIntegra) => {

        let templates = document.createElement('option');

        templates.setAttribute('id', `${tipoIntegra.nombre}`)
        templates.setAttribute('value', `${tipoIntegra.nombre}`)
        templates.innerText = tipoIntegra.nombre;

        optiones.push(templates);

      });

      console.log(optiones);
      let containerIntegraciones = document.querySelectorAll('.cboIdTipoIntegracion');

      containerIntegraciones.forEach((contenedor) => {
        optiones.forEach((option) => {
          contenedor.appendChild(option);
        })
      })

    }
  })

}

function cargarTiposSistemas() {


  $.ajax({
    url: "../processes/mostrar-tipo-sistema.php",
    type: "GET",
    success: function (response) {
      let tipoSistema = JSON.parse(response);

      let defaults = document.createElement('option');
      defaults.innerText = "SELECCIONE";

      let optiones = [];
      optiones.push(defaults);

      tipoSistema.forEach((tipoSistema) => {


        let templates = document.createElement('option');

        templates.setAttribute('id', `${tipoSistema.nombre}`)
        templates.setAttribute('value', `${tipoSistema.nombre}`)
        templates.innerText = tipoSistema.nombre;

        optiones.push(templates);

      });

      let containerTipoSis = document.querySelectorAll('.cboTipoSistema');
      containerTipoSis.forEach((container) => {
        if (container.children.length == 0) {
          optiones.forEach((option) => {
            container.append(option);
          })
        }

      })




      // $(".cboTipoSistema").html(template);
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








//BOTONES ಠ_ಠ


$(document).on("click", ".btn-edit-sucursal", function () {

  /**
  * Limpiando los datos 
 **/

  let containerSis = document.querySelector('#containerSistemas');
  let containerAcc = document.querySelector('#contenedorAccesos');
  containerSis.innerHTML = '';
  containerAcc.innerHTML = '';
  AccesosSucursal = [];
  Sistemas = [];
  sistemasss = [];
  accesoss = [];

  let editarAccesoSistema = document.querySelector('#editarAccesoSistema');
  editarAccesoSistema.setAttribute('value', "");

  let data = tableSucursal.row($(this).parents()).data();

  let id = data.id;
  console.log(id);

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
    $("#exampleFormControlSelect1").val(sucursal.banderaEmpresa);
    $("#codigoApu").val(sucursal.codigoApu);
    $("#urlLogoSucursal").val(sucursal.logo);
    $('.selectpicker').selectpicker("render");



    editarSucursall = true;

    ides.value = sucursal.id;
    bandera = sucursal.banderaEmpresa

    const imgSucursall = document.getElementById("imagenSucursal") || null;
    imgSucursall.setAttribute("src", `${bandera}`);

    const logoSucursal = document.getElementById("previewLogoSucursal") || null;
    logoSucursal.setAttribute("src", `.${sucursal.logo}`);
    logoSucursal.setAttribute("style", "height: 100%; width: 100%;");


    console.log(sucursal);

    temp = ""
    sucursal.sistemas.forEach(sistem => {

      tpsisTemplate = "";

      sucursal.tiposSistemas.forEach(tpSistemas => {
        tpsisTemplate += `
        ${tpSistemas.nombre == sistem.nombre && `<option selected value="${sistem.nombre}">${sistem.nombre}</option>` || `<option>${tpSistemas.nombre}</option>`}
       
       `;
      });

      tempTipoInte = "<option value='0'>Seleccione</option>";

      sucursal.tiposIntegracion.forEach(tpIntegracion => {

        tempTipoInte += `
        
        ${tpIntegracion.nombre == sistem.integracion && `<option selected value="${tpIntegracion.nombre}">${tpIntegracion.nombre}</option>` || `<option value="${tpIntegracion.nombre}">${tpIntegracion.nombre}</option>`}

        `

      })

      temp += ` 
      <tr sistemaid="${sistem.id}">
    <td>  <select name="cboTipoSistema[]" id="cboTipoSistema"
    class="form-control form-control-sm cboTipoSistema">
      ${tpsisTemplate}
</select></td>
    <td ><select name="cboIdTipoIntegracion[]"
    id="cboIdTipoIntegracion" class="form-control form-control-sm cboIdTipoIntegracion">
    ${tempTipoInte}
</select> </td>
    <td> <input type="hidden" name="idSistema[]" value="${sistem.id}"/>  <input type="text" class="form-control form-control-sm" name="proveedor[]"
    id="proveedor" value="${sistem.proveedor}"> </td>
    <td class="text-center"></i> <i class="bi bi-trash3" id="eliminarSistema"></i></td>
  </tr>
        
      `;


    });

    if (sucursal.sistemas[0].nombre) {
      let tabla = document.querySelector("#containerSistemas");
      tabla.innerHTML = temp;
    }


    let tempAcc = ""

    sucursal.accesos.forEach(acceso => {

      tempAcSis = ""

      sucursal.tiposSistemas.forEach(sistemas => {

        tempAcSis += `
        ${sistemas.nombre == acceso.nombreSistema && `<option selected value="${sistemas.nombre}">${sistemas.nombre}</option>` || `<option value="${sistemas.nombre}">${sistemas.nombre}</option>`}
        `;


      })

      let Accesos = [
        "ANYDESK",
        "TEAM VIEWER",
        "ESCRITORIO REMOTO",
      ]

      acc = "";

      Accesos.forEach(a => {

        acc += `
          ${a == acceso.accesos && `<option selected value="${a}">${a}</option>` || `<option value="${a}">${a}</option>`}        
        `
      })

      tempAcc += `
      <tr idAcceso="${acceso.id}" >
      <td>
        <select class="form-control form-control-sm" name="acceso[]">
          ${acc}
        </select>
      </td>
      <td><input type="hidden" name="idAcceso[]" value="${acceso.id}"/> <input name="usuario[]" class="usuario form-control form-control-sm" value="${acceso.usuario}"></td>
      <td><input name="contaseña[]" class="contraseña form-control form-control-sm"  value="${acceso.contraseña}"></td>
      <td style="padding:0;">
        <select name="nombreSistema[]" id="cboTipoSistema" class="form-control form-control-sm cboTipoSistema">
        
        ${tempAcSis}
        
        </select>
      </td>
      <td class="text-center"> <i class="bi bi-trash3" id="eliminarAcceso"></i></td>
    </tr>
      `;
    });



    if (sucursal.accesos[0].accesos) {
      let tablaAcceso = document.querySelector('#contenedorAccesos');
      tablaAcceso.innerHTML = tempAcc;
    } else {
      console.log(" no se registraron accesos ");
    }

    // Obtener el elemento option  para seleccionar

    $("#editarLogoSucursal").val("no editar")



  });

  let nombreBtnRegistro = document.querySelector("#btn_registrar_sucursal");
  nombreBtnRegistro.innerText = "Guardar Cambios";

  let inpuAccesosInfo = document.querySelector("#accesosSucursalPorSistema");
  inpuAccesosInfo.setAttribute("value", ``);



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
    $(".detalleContactoC").val(contacto.detalle);

    editarContacto = true;
  });
  tablaContactos.ajax.reload();

  let inpuTcolor = document.getElementById("correo-contacto");
  inpuTcolor.setAttribute("style", "");

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

/**
 * btn para sucursal
**/

btnes.addEventListener("click", function () {

  let nombreBtnRegistro = document.querySelector("#btn_registrar_sucursal");
  nombreBtnRegistro.innerText = `Registrar`;

  const imgSucursall = document.getElementById("imagenSucursal") || null;
  editarSucursall = false;
  document.getElementById('frm-sucursal').reset();
  imgSucursall.removeAttribute("src", "");


  const inputEditarLogoSucursal = document.getElementById("editarLogoSucursal");
  inputEditarLogoSucursal.setAttribute("value", "");


  const previewLogoSucursal = document.getElementById("previewLogoSucursal")
  previewLogoSucursal.setAttribute("src", "");
  previewLogoSucursal.setAttribute("style", "");

  AccesosSucursal = [];

  let inpuAccesosInfo = document.querySelector("#accesosSucursalPorSistema");
  inpuAccesosInfo.setAttribute("value", ``);

  // let sistema = document.getElementById("cboTipoSistema");
  // sistema.options.selectedIndex = 0;

  // let integracion = document.getElementById("cboIdTipoIntegracion");
  // integracion.options.selectedIndex = 0;

  document.querySelector('#contenedorAccesos').innerHTML = "";
  document.querySelector('#containerSistemas').innerHTML = "";

  sistemasss = [];
  tempSiste = "";
  console.log(sistemasss);
  /**
   *  Limpiando campos
  **/


  let containerBtnEditar = document.querySelector('#container-editar-sistema');
  containerBtnEditar.classList.add('inactive');


}
)

btnAgregarContacto.addEventListener("click", function () {

  editarContacto = false;
  document.getElementById('frm-contactos').reset();
  let inpuTcolor = document.getElementById("correo-contacto");
  inpuTcolor.setAttribute("style", "");
  ocultarFormularioCargo();

})

btnSalir.addEventListener("click", function () {


  fetch('../processes/validator/terminar-sesion.php');

})

let btnNuevaEmpresaIndex = document.getElementById("btnNuevaEmpresaIndex");

btnNuevaEmpresaIndex.addEventListener("click", function () {

  let frmEmpresa = document.getElementById("frm_empresa");
  editar = false;
  frmEmpresa.reset();
  cargarSucursal(0);
  cargarContactos(0);
  preview_logo.setAttribute("src", "");

  btn_ruc.removeAttribute("disabled");

  let inputIdEmpresa = document.getElementById("id");
  inputIdEmpresa.setAttribute("value", "");

})

let btnEnviarContacto = document.getElementById("btnEnviarContacto");

let btnNuevoCargo = document.getElementById("btnNuevoCargo");

btnNuevoCargo.addEventListener("click", function () {


  let contenedorFormularios = document.getElementById("contenedorFormulariosContactos");
  contenedorFormularios.setAttribute("class", "row");

  let frmMularioContacto = document.getElementById("frmMularioContacto");
  frmMularioContacto.setAttribute("class", "col-lg-8");

  let frMularioCargos = document.getElementById("frMularioCargos");
  frMularioCargos.setAttribute("class", "col-lg-4 ");

  btnNuevoCargo.setAttribute("class", "inactive");

  btnEnviarContacto.setAttribute("class", "inactive");

});


let btnCancelarRegistroCargo = document.getElementById("cancelarRegistroCargo");

btnCancelarRegistroCargo.addEventListener("click", function () {


  ocultarFormularioCargo();


})

let iniciarRegistroCargo = document.getElementById("iniciarRegistroCargo");

iniciarRegistroCargo.addEventListener("click", function () {


  let frmData = new FormData(frmCargo);
  let url = '../processes/register/registrar-cargos.php';
  registrar(frmData, url);

  ocultarFormularioCargo();


});


//BTN EDITAR EMPRESA 

let btnEditarEmpresaIndex = document.getElementById("btnEditarEmpresaIndex");

btnEditarEmpresaIndex.addEventListener("click", function () {



  editar = true;

  urlEscucharEmpresaRegistrar = true;

  let rucInputParaEditar = document.getElementById("txtRuc");

  datosCompletosEmpresa(rucInputParaEditar);

  btnAgregarContacto.removeAttribute("disabled");
  btnes.removeAttribute("disabled");

  let btnValidar = document.getElementById("btn_ruc");
  btnValidar.setAttribute("disabled", "");


})
// BTN EDITAR EMPRESA 

function ocultarFormularioCargo() {

  let contenedorFormularios = document.getElementById("contenedorFormulariosContactos");
  contenedorFormularios.setAttribute("class", "card-body");

  let frmMularioContacto = document.getElementById("frmMularioContacto");
  frmMularioContacto.setAttribute("class", "row");

  let frMularioCargos = document.getElementById("frMularioCargos");
  frMularioCargos.setAttribute("class", "col-lg-4 inactive");

  btnNuevoCargo.setAttribute("class", "badge btn-secondary");

  btnEnviarContacto.setAttribute("class", "btn text-light");

  frmCargo.reset();


}


function registrar(data, urlAPI) {

  postData(urlAPI, data)
    .then(data => data.json())
    .then(response => {

      mensajes(response);
      cargarCargos();
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

    let inpuTcolor = document.getElementById("correo-contacto");
    inpuTcolor.setAttribute("style", "border:solid 1px green ;");

  } else {

    let enviaContacto = document.getElementById("btnEnviarContacto");
    enviaContacto.setAttribute("disabled", "");

    let inpuTcolor = document.getElementById("correo-contacto");
    inpuTcolor.setAttribute("style", "border:solid 1px red ;")

  }
  return false;
}

$('#correo-contacto').on('input', validate);

cargarBanderas();
function cargarBanderas() {


  try {
    fetch("../processes/mostrar-banderas.php")
      .then(response => response.json())
      .then(data => {

        let template = '<option value"0"> SELECCIONE UNA BANDERA</option>';

        template = `
          ${data.map(datas => ` 
         
          <option
           id=".${datas.bandera}" value=".${datas.bandera}"  meta-img=".${datas.bandera}">
            ${datas.nombre}
          </option>
         
          `).slice().join('')}
         `;

        document.getElementById("exampleFormControlSelect1").innerHTML = template;



      })

  } catch (e) {
    console.warn("Error" + e);
  }

}


function imageChanged() {
  let selector = document.querySelector("#exampleFormControlSelect1");
  let divImage = document.querySelector("#imageSelected");
  let selectedOption = selector.options[selector.selectedIndex];

  try {

    let image = selectedOption.getAttribute("meta-img");

    divImage.innerHTML = "<img id='imagenSucursal' src='" + image + "'  '>"

  } catch (e) {
    console.warn("Error aun no se carga los datos");
  }
}

imageChanged()



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
      loadingRecords: "",
      processing: "Procesando...",
      search: "",
      searchPlaceholder: "Buscar por..",
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
      loadingRecords: "",
      processing: "Procesando...",
      search: "",
      searchPlaceholder: "Buscar por..",
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
      loadingRecords: "",
      processing: "Procesando...",
      search: "",
      searchPlaceholder: "Buscar por..",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  /**
   * 
   * Se edita la empresa cuando las tablas ya estan cargadas,  estas se destruiran 
   * 
   */

  editarEmpresas(id, edit);

  /**
   * 
   *  Selecct con buscadores 
   * 
   */

  $('#cboIdu').selectpicker('refresh');
  $('#cboIdub').selectpicker('refresh');


})

/***
 * 
 * Inicio de la previsualizacion
 * 
 */

const logoSucursal = document.getElementById("logoSucursal");

logoSucursal.addEventListener('change', () => {


  const archivos = logoSucursal.files;


  if (!archivos || !archivos.length) {

    previewLogoSucursal.src = "";

    return;

  }
  // cargando previsualizacion logo 

  const primerArchivo = archivos[0];
  const objURL = URL.createObjectURL(primerArchivo);

  previewLogoSucursal.src = objURL;

  // esto ocurre cuando se esta editando la sucursal evita que el logo se edite si es que se a subido algun archivo 

  const urlLogoActual = document.querySelector("#urlLogoSucursal")

  urlComparar = "./img/" + primerArchivo.name;

  if (urlComparar === urlLogoActual) {

    const edi = document.getElementById("editarLogoSucursal");
    edi.setAttribute("value", "no editar");

  } else {


    const edi = document.getElementById("editarLogoSucursal");
    edi.setAttribute("value", "editar");

  }


});

/**
 * 
 * Fin de previsualizacion 
 * 
 */


const btnAgregarSistemaSucursal = document.querySelector("#agregarSistemaSucursal");

const btnagregarAcceso = document.querySelector('#agregarAcceso');


let AccesosSucursal = [];
let Sistemas = [];
let Accesos = [];

var tempSiste = "";

var sistemasss = [];

btnAgregarSistemaSucursal.addEventListener('click', function () {

  let editar = document.querySelector('#editarAccesoSistema');
  editar.removeAttribute('value');
  editar.setAttribute('value', 'registrar');


  let sistema = document.createElement('tr');
  let nombre = document.createElement('td');

  let selectSistemas = document.createElement('select');
  selectSistemas.setAttribute('name', 'cboTipoSistema[]')
  selectSistemas.setAttribute('id', 'cboTipoSistema')
  selectSistemas.setAttribute('class', 'form-control form-control-sm cboTipoSistema');

  nombre.appendChild(selectSistemas);

  let integracion = document.createElement('td');
  let selectIntegracion = document.createElement('select');
  selectIntegracion.setAttribute('name', 'cboIdTipoIntegracion[]')
  selectIntegracion.setAttribute('id', 'cboIdTipoIntegracion')
  selectIntegracion.setAttribute('class', 'form-control form-control-sm cboIdTipoIntegracion')
  integracion.appendChild(selectIntegracion);

  let proveedors = document.createElement('td');
  let input = document.createElement('input');

  input.setAttribute('type', 'text');
  input.setAttribute('class', 'form-control form-control-sm');
  input.setAttribute('id', 'proveedor');
  input.setAttribute('name', 'proveedor[]');
  proveedors.appendChild(input);


  let opcion = document.createElement('td');
  opcion.setAttribute('class','text-center');
  let i = document.createElement('i');
  i.setAttribute('class', 'bi bi-trash3');
  i.setAttribute('id', 'eliminarSistema');
  opcion.appendChild(i);

  sistema.appendChild(nombre);
  sistema.appendChild(integracion);
  sistema.appendChild(proveedors);
  sistema.appendChild(opcion);

  console.log(sistema);



  sistemasss.push(sistema);
  console.log(sistemasss);

  let containerSistema = document.getElementById("containerSistemas");

  sistemasss.forEach((sistema) => {
    containerSistema.append(sistema);

  });

  cargarTipointegracion();
  cargarTiposSistemas();


  let toogleVisualizacion = document.getElementById("ojoPrevisualizacion");
  toogleVisualizacion.classList.remove('inactive');


  let inpuAccesosInfo = document.querySelector("#accesosSucursalPorSistema");
  inpuAccesosInfo.setAttribute("value", `${AccesosSucursal}`);

  /**
   * Alerta ( 7 i 7 ) 
  **/

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  Toast.fire({
    icon: 'success',
    title: 'Agregada correctamente'
  })



});

var accesoss = [];
var tem = "";

btnagregarAcceso.addEventListener('click', () => {

  let editar = document.querySelector('#editarAccesoSistema');
  editar.removeAttribute('value');
  editar.setAttribute('value', 'registrar');

  let acces = document.createElement('tr');

  let tiposTd = document.createElement('td');
  let tipos = document.createElement('select');
  let option1 = document.createElement('option')
  option1.setAttribute('value', 'ANYDESK');
  option1.innerText = 'ANYDESK'
  let option2 = document.createElement('option')
  option2.setAttribute('value', 'ESCRITORIO REMOTO')
  option2.innerText = 'ESCRITORIO REMOTO'

  let option3 = document.createElement('option')
  option3.setAttribute('value', 'TEAM VIEWER')
  option3.innerText = 'TEAM VIEWER'


  tipos.appendChild(option1)
  tipos.appendChild(option2)
  tipos.appendChild(option3)
  tipos.setAttribute('class', 'form-control form-control-sm');
  tipos.setAttribute('name', 'acceso[]');
  tiposTd.appendChild(tipos);

  let usuario = document.createElement('td');
  let input = document.createElement('input');
  input.setAttribute('name', 'usuario[]')
  input.setAttribute('class', 'usuario form-control form-control-sm')
  usuario.appendChild(input)

  let contrasena = document.createElement('td');
  let inputContrase = document.createElement('input');
  inputContrase.setAttribute('name', 'contaseña[]')
  inputContrase.setAttribute('class', 'contraseña form-control form-control-sm')
  contrasena.appendChild(inputContrase);

  let sis = document.createElement('td');
  sis.setAttribute('style', 'padding:0;');
  let selectSistemas = document.createElement('select');
  selectSistemas.setAttribute('name', 'nombreSistema[]')
  selectSistemas.setAttribute('id', 'cboTipoSistema')
  selectSistemas.setAttribute('class', 'form-control form-control-sm cboTipoSistema');
  sis.appendChild(selectSistemas);

  let opti = document.createElement('td');
  opti.setAttribute('class','text-center');

  let i = document.createElement('i');
  i.setAttribute('class', 'bi bi-trash3');
  i.setAttribute('id', 'eliminarAcceso');
  opti.appendChild(i);


  acces.appendChild(tiposTd);
  acces.appendChild(usuario);
  acces.appendChild(contrasena);
  acces.appendChild(sis);
  acces.appendChild(opti);


  console.log(acces);
  accesoss.push(acces);


  const containerAcceso = document.querySelector('#contenedorAccesos');

  accesoss.forEach((acceso) => {
    console.log(acceso);
    containerAcceso.appendChild(acceso);

  })

  cargarTiposSistemas();

});

var mostrarAlerta = 'true';

$(document).on('click', "#editarSistema", function () {

  let editar = document.querySelector('#editarAccesoSistema');
  editar.removeAttribute('value');
  editar.setAttribute('value', '');

  /**
   * obteniendo el  sistema , T.Integracion idSucursal
  **/

  let info = this.parentElement.parentElement;
  let sistem = info.getAttribute('sistema');

  let integraci = info.lastChild.parentNode.children[1];
  let integracio = integraci.getAttribute('integracion');

  let proveed = info.lastChild.parentElement.children[2].firstChild.data;




  /**
   * Mostrando data necesaria Seleccionando Sistema y T.Integracion
  **/

  let sistema = document.getElementById(`${sistem}`);
  sistema.removeAttribute('selected');
  sistema.setAttribute('selected', '');


  let integracion = document.getElementById(`${integracio}`)
  integracion.removeAttribute('selected');
  integracion.setAttribute('selected', '');

  let proveedor = document.getElementById('proveedor');
  proveedor.value = proveed;

  console.log(proveedor);

  /**
   * creando objeto en el que se guardaran los accesos por Sistema
  **/

  let accesoSistema = []

  /**
   * se recorren todos los accesos
  **/

  todosLosAccesos.forEach(i => {

    /*Si los accesos no existen en @accesoSistema entonces
     *la creamos e inicializamos el arreglo de Accesos.
    **/

    if (!accesoSistema.hasOwnProperty(i.sistema)) {
      accesoSistema[i.sistema] = {
        accesosSistema: []
      }
    }

    accesoSistema[i.sistema].accesosSistema.push({

      nombre: i.nombre,
      usuario: i.usuario,
      contraseña: i.contraseña

    })

  })


  /**
   * Obteniendo accesos 
  **/


  let accesos = accesoSistema[`${sistem}`].accesosSistema;

  accesos.forEach(acceso => {

    if (acceso.nombre === "ANYDESK") {

      let contraseña = document.getElementById('contraseña_ANY');
      contraseña.setAttribute('value', `${acceso.contraseña}`);

      let usuario = document.getElementById('usuario_ANY');
      usuario.setAttribute('value', `${acceso.usuario}`);

    } else if (acceso.nombre === "TEAMVIEWER") {

      let contraseña = document.getElementById('contraseñaa');
      contraseña.setAttribute('value', `${acceso.contraseña}`);

      let usuario = document.getElementById('usuariosa');
      usuario.setAttribute('value', `${acceso.usuario}`);

    } else if (acceso.nombre === "ESCRITORIO_REMOTO") {

      let contraseña = document.getElementById('contraseña_ER');
      contraseña.setAttribute('value', `${acceso.contraseña}`);

      let usuario = document.getElementById('usuario_ER');
      usuario.setAttribute('value', `${acceso.usuario}`);

    }

  })

  /**
   * Mostrando btn editar
  **/

  let containerBtnEditar = document.querySelector('#container-editar-sistema');
  containerBtnEditar.classList.remove('inactive');

  //accesoSistema.forEach

  if (mostrarAlerta === 'true') {

    Swal.fire({
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1665/1665697.png',
      imageWidth: 100,
      imageHeight: 100,
      title: '',
      text: 'Editaras un sistema realiza los cambio y da click en editar',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'ok',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<li id="ocultarAlerta">No volver a mostrar</li>',
      cancelButtonAriaLabel: 'Thumbs down'

    })

  } else {

  }


  try {

    let ocultar = document.getElementById('ocultarAlerta');
    ocultar.addEventListener('click', () => {
      mostrarAlerta = 'false';
      console.log(mostrarAlerta)
    });

  } catch (e) {
    console.warn(`Esperando al mensaje ${e}`);
  }


});








$(document).on('click', "#eliminarSistema", function () {


  Swal.fire({
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/604/604573.png',
    imageWidth: 100,
    imageHeight: 100,
    title: 'Estas seguro ?',
    text: "Si se elimina no podra ser recuperado",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'

  }).then((result) => {

    if (result.isConfirmed) {

      let data = this.parentElement.parentElement;
      let sistema = data.getAttribute('sistemaid');
      let sucursal = document.querySelector('#txtIdSucursal').value;
      console.log(sucursal);

      const RUTA = `../processes/delete/eliminar-sistema.php?sistema=${sistema}&sucursal=${sucursal}`;


      fetch(RUTA)
        .then(response => response.text())
        .then(data => console.log(data));


      data.remove();
      sistemasss = [];
      sistemasss.pop();



    }

  })


});

$(document).on('click', "#eliminarAcceso", function () {

  console.log(accesoss);

  Swal.fire({
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/604/604573.png',
    imageWidth: 100,
    imageHeight: 100,
    title: 'Estas seguro ?',
    text: "Si se elimina no podra ser recuperado",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'

  }).then((result) => {

    if (result.isConfirmed) {

      let data = this.parentElement.parentElement;
      let sucursal = document.querySelector('#txtIdSucursal').value;
      let acceso = data.getAttribute('idAcceso');

      const RUTA = `../processes/delete/eliminar-acceso.php?acceso=${acceso}&&sucursal=${sucursal}`;


      fetch(RUTA)
        .then(response => response.text())
        .then(data => console.log(data));


      data.remove();
      accesoss = []
      accesoss.pop();
    }

  })


});

const TieneValores = (input, inputContenedor = false) => {

  let valores = document.querySelector(input).value;

  if (!valores) document.querySelector(input).classList.add('is-invalid');

  if (inputContenedor && valores == 0) document.querySelector(inputContenedor).classList.add('campo-faltante');


}

const RellenandoCamposFaltantes = (input = false, inputContenedor = false) => {

  if (inputContenedor) document.querySelector(inputContenedor).addEventListener('click', () => {


    document.querySelector(inputContenedor).classList.remove('campo-faltante');
    return;

  })


  if (input) document.querySelector(input).addEventListener('click', () => {

    document.querySelector(input).classList.remove('is-invalid');

  })


}


RellenandoCamposFaltantes('#txtNombreCo');
RellenandoCamposFaltantes(false, '.container-rubro');
RellenandoCamposFaltantes(false, '.container-rubro');
RellenandoCamposFaltantes('#txtNombreCo');
RellenandoCamposFaltantes('#txtRazonSocial');
RellenandoCamposFaltantes('#txtDireccion');
RellenandoCamposFaltantes(false, '#tipoEnvio');
RellenandoCamposFaltantes('#txtNombreSucursal');
RellenandoCamposFaltantes('#txtDireccionSucursal');
