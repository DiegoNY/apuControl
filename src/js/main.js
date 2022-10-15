//para los grupos
let editar = false;

$(document).ready(function () {
  $("#tabla-grupo").DataTable({
    scrollY: "420px",
    scrollCollapse: true,
    paging: true,
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json",
    },
    dom: '<"toolbar">Bftrp',
  });
});

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
  $.ajax({
    url: "registrar-empresa.php",
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
        </tr>
        `;
      });
      
      $("#listado-empresas").html(template);
    },
  });
}

//Para los Contactos
RegistrarContactos();
function RegistrarContactos(){
  $.ajax({
    url: 'registrar-contactos.php',
    type: 'GET',
    success: function(response){
      console.log(response);
    }
  })
}