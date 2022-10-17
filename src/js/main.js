//para los grupos
let editar = false;
let editarContacto = false;
let editarSucursall = false;
// $(document).ready(function () {
//   $("#tabla-grupo").DataTable({
//     scrollY: "420px",
//     scrollCollapse: true,
//     paging: true,
//     language: {
//       url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json",
//     },
//     dom: '<"toolbar">Bftrp',
//   });
// });

function RegistrarGrupo() {
  //si aun no estamos editando se registrara el grupo  pero si se esta editando se editaran los datos
  let url = editar === false ? "procesarGrupo.php" : "editar-grupo.php";
  $.ajax({
    type: "GET",
    data: $("#frm_grupo").serialize(),
    url: url,
    success: function (data) {
      console.log(data);
      //cuando se ingresen los grupos se motran en pantalla sin refrescar
      CargarGrupos();

      //muestra verde si se enviaron los datos cambiar por una alerta owo
      const alerta = document.querySelector("#alerta");
      alerta.classList.toggle(data);
    },
  });
  //se reinicia el formulario cuando enviamos datos
  $("#frm_grupo").trigger("reset");
}

CargarGrupos();

function CargarGrupos() {
  $.ajax({
    url: "mostrarGrupos.php",
    type: "GET",
    success: function (response) {
      let grupos = JSON.parse(response);
      let templates = "";
      //recorriendo el grupo y mostrandolo en la tabla por ello se creo el template
      grupos.forEach((grupos) => {
        templates += `
            <tr id-grupos="${grupos.id} ">
                <td>${grupos.id}</td>
                <td>${grupos.nombre}</td>
                <td>${grupos.descripcion}</td>
                <td>${grupos.fechaCreacion}</td>
                <td>${grupos.usuarioCreacion}</td>
                <td>${grupos.estado}</td>
                
                <td><i class="btn-edit"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>
                
                <td><i class="btn-delete"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
            </tr>
            `;
      });
      //pasamos el template al index
      $("#listado-grupos").html(templates);
    },
  });
}

EliminarGrupo();
function EliminarGrupo() {
  $(document).on("click", ".btn-delete", function () {
    //obteniendo toda la fila para poder obtener el id
    if (confirm("Quieres eliminar el Grupo ?")) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr("id-grupos");
      $.post("eliminarGrupo.php", { id }, function (response) {
        console.log(response);
        CargarGrupos();
      });
    }
  });
}

$(document).on("click", ".btn-edit", function () {
  let element = $(this)[0].parentElement.parentElement;
  let id = $(element).attr("id-grupos");
  $.post("escuchar-grupo.php", { id }, function (response) {
    let grupo = JSON.parse(response);

    $("#id_grupo").val(grupo.id);
    $("#txtNombre").val(grupo.nombre);
    $("#txtDescripcion").val(grupo.descripcion);
    $("#txtEstado").val(grupo.estado);
    $("#txtUsuCre").val(grupo.usuarioCreacion);
    $("#txtFechCre").val(grupo.fechaCreacion);
    editar = true;
  });
});

cargaGrupoEnFrm();
function cargaGrupoEnFrm() {
  //cargando grupo en frm-empresa
  $.ajax({
    url: "mostrarGrupos.php",
    type: "GET",
    success: function (response) {
      let grupos = JSON.parse(response);
      let template = "";
      //recorriendo el grupo y mostrandolo en la tabla por ello se creo el template
      grupos.forEach((grupos) => {
        template += `
                
                <option value="${grupos.id}">${grupos.nombre}</option>
              
        `;
      });
      //pasamos el template al index
      $("#cbogrupo").html(template);
    },
  });
}

//PARA LA EMPRESA
RegistrarEmpresa();
function RegistrarEmpresa() {
  let url = editar === false ? "registrar-empresa.php" : "editar-empresa.php";
  $.ajax({
    url: url,
    type: "GET",
    data: $("#frm_empresa").serialize(),
    success: function (response) {
      console.log(response);
      MostrarEmpresas();
    },
  });

  $("#frm_empresa").trigger("reset");
}

MostrarEmpresas();
function MostrarEmpresas() {
  $.ajax({
    url: "mostrar-empresas.php",
    type: "GET",
    success: function (response) {
      let empresas = JSON.parse(response);
      let template = "";
      empresas.forEach((empresas) => {
        template += `
        <tr id-empresa="${empresas.id}">
          <td>${empresas.nom_comercial}</td>
          <td>${empresas.ruc}</td>
          <td>${empresas.razon_social}</td>
          <td>${empresas.id_ubigeo}</td>
          <td>${empresas.id_grupo}</td>
          <td>${empresas.id_rubro}</td>
          <td>${empresas.tipo_envio}</td>
          <td>fecha de registo</td>
          <td>${empresas.estado_comercial}</td>
          <td>${empresas.tipo_persona}</td>
          <td>${empresas.estado}</td>
          
          <td><i class="btn-edit-empresa"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>

          <td><i class="btn-delete-empresa"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>

        </tr>
        `;
      });

      $("#listado-empresas").html(template);
    },
  });
}

/*
 *
 *  Elimina a las empresas ingresando a travez del  dom al atributo id
 *
 */
eliminarEmpresa();
function eliminarEmpresa() {
  $(document).on("click", ".btn-delete-empresa", function () {
    //ingresando a las propiedas de la tabla
    let element = $(this)[0].parentElement.parentElement;
    //capturando el id
    let id = $(element).attr("id-empresa");
    $.post("eliminar-empresa.php", { id }, function (response) {
      MostrarEmpresas();
      console.log(response);
    });
  });
}
editarEmpresas();
function editarEmpresas() {
  $(document).on("click", ".btn-edit-empresa", function () {
    let element = $(this)[0].parentElement.parentElement;

    let id = $(element).attr("id-empresa");

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
  });
}

//Para los Contactos
registrarContactos();
function registrarContactos() {
    let url = editarContacto === false ? "registrar-contactos.php" : "editar-contacto.php";
  $.ajax({
    url: url,
    data:$("#frm-contactos").serialize(),
    type: "GET",
    success: function (response) {
      console.log(response);
      mostrarContactos();
      editarContacto = false;
    },
  });

  $("#frm-contactos").trigger("reset");
}

mostrarContactos();
function mostrarContactos(){
  $.ajax({
    url: "mostrar-contactos.php",
    type: "GET",
    success: function(response){
      let contactos = JSON.parse(response);
      let template= "";

      contactos.forEach((contactos)=>{
        template+=`
        <tr id-contacto="${contactos.id} ">
        <td>${contactos.id_empresa}</td>
        <td>${contactos.nombre}</td>
        <td>${contactos.cargo}</td>
        <td>${contactos.telefono}</td>
        <td>${contactos.correo}</td>

        <td><i class="btn-edit-contacto"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>
        
        <td><i class="btn-delete-contacto"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
    </tr>
        `
      });

      $("#listado-contactos").html(template);
    }
  });
}


eliminarContacto();
function eliminarContacto(){

  $(document).on("click",".btn-delete-contacto",function(){
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id-contacto");
    
    $.post("eliminar-contactos.php",{id},function(response){
      console.log(response);
      mostrarContactos();
    })
  })
}

editarContactos();
function editarContactos(){
    $(document).on("click",".btn-edit-contacto",function(){
        let element = $(this)[0].parentElement.parentElement;

        let id = $(element).attr("id-contacto");

        $.post("escuchar-contacto.php",{id},function(response){
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

function registrarSucursal(){
    let url = editarSucursall === false ? "registrar-sucursal.php":"editar-sucursal.php";
    $.ajax({
        url: url,
        data:$("#frm-sucursal").serialize(),
        type: "GET",
        success: function (response) {
            console.log(response);
            mostrarSucursal();
            editarSucursall = false;
        },
      });
      $("#frm-sucursal").trigger("reset");
}

mostrarSucursal();
function mostrarSucursal(){
    $.ajax({
        url: "mostrar-sucursal.php",
        type:"GET",
        success: function(response){
            let sucursal = JSON.parse(response);
            let template  = "";
            sucursal.forEach((sucursal)=>{
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
function eliminarSucursal(){
    $(document).on("click",".btn-delete-sucursal",function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr("id");

        $.post("eliminar-sucursal.php",{id},function(response){
            console.log(response);
            mostrarSucursal();
        })    
    });
}   

editarSucursal();
function editarSucursal(){
    $(document).on("click",".btn-edit-sucursal",function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr("id");

        $.post("escuchar-sucursal.php",{id},function(response){
            let sucursal = JSON.parse(response);
            console.log(sucursal);
            $("#id-sucursal").val(sucursal.id);
            $("#txtNombreSucursal").val(sucursal.nombre);
            $("#txtDireccionSucursal").val(sucursal.direccion);
            $("#txtCodigoCofide").val(sucursal.codigo_cofide);
            $("#cboIdu").val(sucursal.ubigeo);
            $("#txtIdEmpresa").val(sucursal.id_empresa);
            editarSucursall = true;
        });
    })
}