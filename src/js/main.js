//para los grupos

function RegistrarGrupo() {
  
  let url = editar === false ? "procesarGrupo.php" : "editar-grupo.php";
  $.ajax({
    type: "GET",
    data: $("#frm_grupo").serialize(),
    url: url,
    success: function (data) {
      mensajes(data, "Se registro el grupo 🐱‍👤", "Rellena todos los campos");
    },
  });
  $("#frm_grupo").trigger("reset");
}

cargaGrupoEnFrm();
function cargaGrupoEnFrm() {
  $.ajax({
    url: "mostrarGrupos.php",
    type: "GET",
    success: function (response) {
      console.log(response)
      let grupos = response["data"];
      console.log(grupos);
      let template = "";
      grupos.forEach((grupos) => {
        template += `
                
                <option value="${grupos.nombre}">${grupos.nombre}</option>
              
        `;
      });
      console.log(template);
      $("#cbogrupo").html(template);
    },
  });
}


//PARA LA EMPRESA
function RegistrarEmpresa() {
  let url = editar === false ? "registrar-empresa.php" : "editar-empresa.php";
  $.ajax({
    url: url,
    type: "GET",
    data: $("#frm_empresa").serialize(),
    success: function (response) {
      console.log(response);
      mostrarSucursal();
      mensajes(response, "Se ingreso la empresa :D", "Faltan datos IMPORTANTES de la empresa");
    },
  });

  $("#frm_empresa").trigger("reset");
}



//recibo valores por post 
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get('id');
let edit = urlParams.get('edit');

editarEmpresas(id, edit);

function editarEmpresas() {

  $.post("escuchar-empresa.php", { id }, function (response) {
    let empresa = JSON.parse(response);
    console.log(empresa);
    $("#txtNombreCo").val(empresa.nom_comercial);
    $("#id").val(empresa.id);
    $("#txtRuc").val(empresa.ruc);
    $("#txtRazonSocial").val(empresa.razon_social);
    $("#txtDireccion").val(empresa.direccion);
    $("#cbogrupo").val(empresa.id_grupo);
    $("#cboTipoSistema").val(empresa.id_tipo_sistema);
    $("#cboIdRubro").val(empresa.id_rubro);
    $("#cboTipoEnvio").val(empresa.tipo_envio);
    $("#cboIdTipoIntegracion").val(empresa.id_tipo_integracion)
    $("#txtFechaRegistro").val(empresa.fecha_registro);
    $("#txtEstadoComercial").val(empresa.estado_comercial);
    $("#cboTipoPersona").val(empresa.tipo_persona);
    $("#cboIdu").val(empresa.id_ubigeo);
    $("#cboEstado").val(empresa.estado);
    editar = true;
  });
}

//Para los Contactos
function registrarContactos() {
  let url = editarContacto === false ? "registrar-contactos.php" : "editar-contacto.php";
  $.ajax({
    url: url,
    data: $("#frm-contactos").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mostrarContactos();
      mensajes(response, "Contacto Registrado", "Rellena todos los campos ❌");
      editarContacto = false;
    },
  });

  $("#frm-contactos").trigger("reset");
}

mostrarContactos();
function mostrarContactos() {
  $.ajax({
    url: "mostrar-contactos.php",
    type: "GET",
    success: function (response) {
      let contactos = JSON.parse(response);
      let template = "";

      contactos.forEach((contactos) => {
        template += `
        <tr id-contacto="${contactos.id} ">
        <td>${contactos.id_empresa}</td>
        <td>${contactos.nombre}</td>
        <td>${contactos.cargo}</td>
        <td>${contactos.telefono}</td>
        <td>${contactos.correo}</td>

        <td><i class="btn-edit-contacto" onclick="editarContactos()"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>
        
        <td><i class="btn-delete-contacto" onclick="eliminarContacto()"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
    </tr>
        `
      });

      $("#listado-contactos").html(template);
    }
  });
}


function eliminarContacto() {

  $(document).on("click", ".btn-delete-contacto", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id-contacto");

    $.post("eliminar-contactos.php", { id }, function (response) {
      console.log(response);
      mostrarContactos();
    })
  })
}


function editarContactos() {
  $(document).on("click", ".btn-edit-contacto", function () {
    let element = $(this)[0].parentElement.parentElement;

    let id = $(element).attr("id-contacto");

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

    })
  })
}

//Para la sucursal 

function registrarSucursal() {
  let url = editarSucursall === false ? "registrar-sucursal.php" : "editar-sucursal.php";
  $.ajax({
    url: url,
    data: $("#frm-sucursal").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mostrarSucursal();
      mensajes(response, "Ok, se registro la sucursal", "Te falta llenar algunos datos importantes ☹");
      editarSucursall = false;
    },
  });
  $("#frm-sucursal").trigger("reset");
}
mostrarSucursal();
function mostrarSucursal() {
  $.ajax({
    url: "mostrar-sucursal.php",
    type: "GET",
    success: function (response) {
      let sucursal = JSON.parse(response);
      let template = "";
      sucursal.forEach((sucursal) => {
        template += `
                
                <tr id="${sucursal.id}">
                    <td>${sucursal.id_empresa}</td>
                    <td>${sucursal.nombre}</td>
                    <td>${sucursal.ubigeo}</td>
                    <td>${sucursal.codigo_cofide}</td>
                    <td>${sucursal.direccion}</td>
                    <td><i class="btn-edit-sucursal"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>

                    <td><i class="btn-delete-sucursal"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
                </tr>
                
                `
      });
      $("#listado-sucursal").html(template);
    }
  });
}

eliminarSucursal();
function eliminarSucursal() {
  $(document).on("click", ".btn-delete-sucursal", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id");

    $.post("eliminar-sucursal.php", { id }, function (response) {
      console.log(response);
      mostrarSucursal();
    })
  });
}


editarSucursal();
function editarSucursal() {
  $(document).on("click", ".btn-edit-sucursal", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id");

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
      //cargando los datos al frm de acceso se hara con un btn 
      $("#txtIdSucursal").val(ides);

    });
  })
}

//CRUD ACCESOS
// Prueba cargando id de acceso 



function registrarAccesos() {
  let url = editarAcceso === false ? "registrar-accesos.php" : "editar-acceso.php";
  $.ajax({
    url: url,
    data: $("#frm-accesos").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mostrarAccesos();
      mensajes(response, "Bien Se ingresaron los accesos 😀", "Completa Todos los campos");
      editarAcceso = false;

    }
  });
  $("#frm-accesos").trigger("reset");
}

mostrarAccesos();
function mostrarAccesos() {
  $.ajax({
    url: "mostrar-accesos.php",
    type: "GET",
    success: function (response) {
      let accesos = JSON.parse(response);
      let template = "";
      console.log(accesos);
      accesos.forEach((accesos) => {
        template += `
        <tr id-acceso="${accesos.id} " class="odd">
          <td class="sorting_1" >${accesos.id_sucursal}</td>
          <td>${accesos.nombreAcceso}</td>
          <td>${accesos.idAcceso}</td>
          <td>${accesos.contrasena}</td>

          <td><i class="btn-edit-acceso"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>

          <td><i class="btn-delete-acceso"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
        </tr>
        `
      });
      $("#listado-accesos").html(template);
    }
  });
}

eliminarAcceso();
function eliminarAcceso() {

  $(document).on("click", ".btn-delete-acceso", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id-acceso")
    console.log(id);

    $.post("eliminar-acceso.php", { id }, function (response) {
      console.log(response);
      mostrarAccesos();
    });
  })
}

editarAcceso()
function editarAcceso() {

  $(document).on("click", ".btn-edit-acceso", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id-acceso")
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

        `
      });
      $("#cboIdu").html(template);
      $("#cboIdub").html(template);

    }

  })

  //tabs 

  $(function () {
    $("#tabs").tabs();
  });
}

//CRUD LOGO 
mostrarLogoss();
function mostrarLogoss() {
  $.ajax({
    url: "mostrar-logo.php",
    type: "GET",
    success: function (response) {
      let logo = JSON.parse(response);
      let template = "";

      logo.forEach((logo) => {

        template += `

        <div class="contenedor-img" id-logo="${logo.id}">
        <img src="${logo.ruta}" alt="${logo.nombre}">
        <button  class="btn-delete-logo">brrar</button>
        </div>
        
        `
      });
      $("#contenedor-img-banderas").html(template);
    }
  });
}


$(document).on('click', ".btn-delete-logo", function () {
  let element = $(this)[0].parentElement;
  let id = $(element).attr("id-logo");
  console.log(id);
  $.post("eliminar-logo.php", { id }, function (response) {
    console.log(response);
    mostrarLogoss();
  }
  );
}
)

document.getElementById("btn_registrar").addEventListener('click', (e) => {
  e.preventDefault();

  let frm = document.getElementById('frm_logo');
  let frmdata = new FormData(frm);

  $.ajax({
    method: 'post',
    url: "registrar-logo.php",
    data: frmdata,
    cache: false,
    processData: false,
    contentType: false,
    success: (response) => {
      console.log(response);
      mensajes(response, "Ingresaste un Logo 😃", "Seguro falto el nombre 😲");

    }
  });
})

//alerta 

function mensajes(response, mensaje, error) {

  if (response == "ingresado") {
    Swal.fire(
      'Registrado con exito',
      `${mensaje}`,
      'success'
    ).then(() => {
      console.log("tabla actualizada")
      mostrarLogoss();
    })
  } else {

    Swal.fire(
      'Completa todos los campos',
      `${error}`,
      'error'
    ).then(() => {
      console.log("no hay datos");
    })

  }

}


//dataTable 


dataTables('#tabla_sucursals');
dataTables('#tabla_contactoss');
dataTables('#tabla_accesos');

function dataTables(id) {
  $(id).DataTable({
    scrollY: '200px',
    scrollCollapse: true,
    paging: false,
  });

}
var editar = false;
var editarContacto = false;
var editarSucursall = false;
var editarAccesp = false;

$(document).ready(function () {
 

//empresa cargando data
  let tablaEmpresa = $("#tabla_empresasas").DataTable({
    ajax: "mostrar-empresas.php",
    columns: [
      { data: 'id' },
      { data: 'ruc' },
      { data: 'razon_social' },
      { data: 'id_ubigeo' },
      { data: 'id_grupo' },
      { data: 'id_rubro' },
      { data: 'tipo_envio' },
      { data: 'id_tipo_integracion' },
      { data: 'fecha_registro' },
      { data: 'estado_comercial' },
      { data: 'tipo_persona' },
      { data: 'estado' },
      {
        defaultContent: `<div class="dropdown  ">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-calendar3"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li id="btn-editar-empresa"><a class="dropdown-item">Editar</a></li>
        <li id="btn-nose"><a class="dropdown-item" >Another action</a></li>
        <li id="btn-nose"><a class="dropdown-item" >Something else here</a></li>
      </ul>
    </div>`},
      { defaultContent: `<i class="bi bi-x-circle-fill btn-delet"></i>` },
    ],
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
      },
  }

  });

  $(document).on("click", ".btn-delet", function () {

    let data = tablaEmpresa.row($(this).parents()).data();
    console.log(data);
    let id = data.id;
    $.post("eliminar-empresa.php", { id }, function (response) {
      console.log(response);
      tablaEmpresa.ajax.reload();
    });
  });

  $(document).on("click", "#btn-editar-empresa", function () {
    let data = tablaEmpresa.row($(this).parents()).data();
    let id = data.id;
    window.location.replace(`index.php?id=${id}&&edit=2`);
  })


  //CRUD para los grupos 
  let tablaGrupos = $("#tabla-grupos").DataTable({
    ajax: "mostrarGrupos.php",
    columns: [
      { data: 'id' },
      { data: 'nombre' },
      { data: 'descripcion' },
      { data: 'fechaCreacion' },
      { data: 'usuarioCreacion' },
      { data: 'estado' },
      {
        defaultContent: `<i class="bi bi-pencil-square btn-edit-grup"></i>`
      },
      { defaultContent: `<i class="bi bi-x-circle-fill btn-delet-grup"></i>` }
    ], 
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
      },
  }
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
  //CRUD 

})