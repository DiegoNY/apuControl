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


const hoy = new Date();

var fechaInput = document.getElementById("txtFechaRegistro").value = hoy.toLocaleDateString();

var fechaCargo = document.getElementById("fechaCargo").value = hoy.toLocaleDateString();

var urlEscucharEmpresaRegistrar = false;


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
        loadingRecords: "Cargando...",
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
        loadingRecords: "Cargando...",
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
    tablaContactos.destroy();

  }
}

let todosLosAccesos = [];
let todosLosSitemas = [];
let Sistema = [];

function cargarAccesos(id) {


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
      <td> ${sistema.integracion} </td>
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
      }

    },
  });
  $("#frm-sucursal").trigger("reset");
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

      }

    },
  });
  $("#frm-contactos").trigger("reset");
}

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

          console.log("entre aca")

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


      data.forEach((data) => {


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


function cargarTipointegracion() {

  $.ajax({
    url: "../processes/mostrar-tipo-integracion.php",
    type: "GET",
    success: function (response) {

      let tipoIntegra = JSON.parse(response);
      let template = "<option value='0' > SELECCIONE </option>";

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
      let template = "<option value='0' > SELECCIONE </option>";

      tipoSistema.forEach((tipoSistema) => {
        template += `
       
        <option id="${tipoSistema.nombre}" value="${tipoSistema.nombre}">${tipoSistema.nombre}</option>
        
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

  // let numeroSucursal = (this).parentElement.parentElement.parentElement;

  // console.log(numeroSucursal);

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


    /**
     * @cargarAccesos carga los acceso y tambien los sistemas 
     */
    cargarAccesos(id);

    $("#editarLogoSucursal").val("no editar")



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
    $("#id-contacto").val(contacto.id);
    $("#nombre-contacto").val(contacto.nombre_contacto);
    $("#cargo-contacto").val(contacto.cargo);
    $("#correo-contacto").val(contacto.correo);
    $("#id-empresa-contacto").val(contacto.id_empresa);
    $("#telefono-contacto").val(contacto.telefono);
    $("#detalleContacto").val(contacto.detalle);
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


btnes.addEventListener("click", function () {

  const imgSucursall = document.getElementById("imagenSucursal") || null;
  editarSucursall = false;
  document.getElementById('frm-sucursal').reset();
  imgSucursall.removeAttribute("src", "");


  const inputEditarLogoSucursal = document.getElementById("editarLogoSucursal");
  inputEditarLogoSucursal.setAttribute("value", "");


  const previewLogoSucursal = document.getElementById("previewLogoSucursal")
  previewLogoSucursal.setAttribute("src", "");

  AccesosSucursal = [];

  let inpuAccesosInfo = document.querySelector("#accesosSucursalPorSistema");
  inpuAccesosInfo.setAttribute("value", ``);

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

  console.log("click me , ah ⁉");

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

    divImage.innerHTML = "<img id='imagenSucursal' src='" + image + "' style='width:100%; height:150px; '>"

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
      loadingRecords: "Cargando...",
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
      loadingRecords: "Cargando...",
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
      loadingRecords: "Cargando...",
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

let AccesosSucursal = [];
let Sistemas = [];
let Accesos = [];

btnAgregarSistemaSucursal.addEventListener('click', function () {

  let tipoSistema = document.querySelector('#cboTipoSistema').value;
  let tipoIntegracion = document.querySelector('#cboIdTipoIntegracion').value;
  let usuarioAnydesk = document.querySelector('#usuariosa').value;
  let contraseñaAnydesk = document.querySelector('#contraseñaa').value;
  let usuarioTViewer = document.querySelector('#usuario_ANY').value;
  let contraseñaTViewer = document.querySelector('#contraseña_ANY').value;
  let usuarioEscriRemoto = document.querySelector('#usuario_ER').value;
  let contraseñaEscriRemoto = document.querySelector('#contraseña_ER').value;
  let proveedor = document.querySelector('#proveedor').value;

  AccesosSucursal.push(


    tipoIntegracion,
    tipoSistema,
    usuarioAnydesk,
    contraseñaAnydesk,
    usuarioTViewer,
    contraseñaTViewer,
    usuarioEscriRemoto,
    contraseñaEscriRemoto,
    proveedor,
    "|"

  );

  /**
 *    previsualizacion de los sistemas agregados
 **/
  Sistemas.push(

    {
      nombre: tipoSistema,
      integracion: tipoIntegracion,
      proveedor: proveedor,

    }

  )

  Accesos.push(

    {
      id: tipoSistema,
      anydesk: {

        usuario: usuarioTViewer,
        contraseña: contraseñaTViewer

      },

      teamViewer: {

        usuario: usuarioAnydesk,
        contraseña: contraseñaAnydesk

      }


    }

  )

  Accesos.forEach((acceso) => {

    console.table(acceso);

  })

  /**
  *     fin previsualizacion de los sistemas agregados
  **/

  /**
   * 
   * Agregando accesos a input para ser enviados a la BD 
   * 
   */

  let inpuAccesosInfo = document.querySelector("#accesosSucursalPorSistema");
  inpuAccesosInfo.setAttribute("value", `${AccesosSucursal}`);




});



$(document).on('click', "#editarSistema", function () {

  
  /**
   * obteniendo el  sistema 
  **/
   
  let sist = this.parentElement.parentElement;
  let sistem = sist.getAttribute('sistema')
  
  /**
   * creando objeto en el que se guardaran los accesos por Sistema
  **/

  let accesoSistema = []

  /**
   * se recorren todos los accesos
  **/

  todosLosAccesos.forEach(i => {

    //Si los accesos no existen en nuevoObjeto entonces
    //la creamos e inicializamos el arreglo de Accesos. 

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

  
  console.log(accesoSistema);

  //accesoSistema.forEach

});

$(document).on('click', "#eliminarSistema", function () {

  console.log("Delete ");


  let sitemaEliminar = todosLosSitemas.map(item => {

    return [item.nombre, item.acceso.id, item.sistema.id, item]

  });


  var sistemaEliminarMapArr = new Map(sitemaEliminar);



  let sistemaEliminar = [...sistemaEliminarMapArr.values()];

  console.log(sistemaEliminar);


});






