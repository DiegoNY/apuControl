let editar = false;
const hoy = new Date();
const btnAgregarGrupo = document.getElementById("btn_agregar_grupo");
var fechaInput = document.getElementById("txtFechCre").value = hoy.toLocaleDateString();
const btnSalir = document.getElementById("btnSalir");


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


$(document).ready(function () {



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
      cargaGrupoEnFrm();
      mostrarGrupos();
    },
  });
  $("#frm_grupo").trigger("reset");
  mostrarGrupos();

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