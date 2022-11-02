
$(document).ready(function () {
  //empresa cargando data
  let tablaEmpresa = $("#tabla_empresasas").DataTable({ destroy: true,
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    destroy: true,
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    ajax: "../processes/mostrar-empresas.php",
    columns: [
      { data: "id" },
      {
        data: 'logo', "render": function (data, type, row) {
          return `<center><img src="../${data}" style="width:50px; height:50px;"></center>`
        }
      },
      { data: "nom_comercial" },
      { data: "id_grupo" },
      { data: "ruc" },
      { data: "id_rubro" },
      { data: "tipo_envio" },
      { data: "estado_comercial" },
      {
        defaultContent: `<div class="dropdown  ">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-calendar3 text-primary"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li id="btn-editar-empresa"><a class="dropdown-item">Editar</a></li>
        <li  data-bs-toggle="modal" data-bs-target="#sucursales"><a class="dropdown-item" >Sucursales</a></li>
        <li  data-bs-toggle="modal" data-bs-target="#contactos"><a class="dropdown-item" >Contactos</a></li>
        <li class="btn-delet"><a class="dropdown-item">Eliminar</a></li>
      </ul>
    </div>`,
      },
    ],
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Empresas",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Empresas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": ">    >>",
        "previous": "<<    <"
      },
    }

  });

  $(document).on("click", ".btn-delet", async function () {
    const module = await import('./alertas.js');

    let data = tablaEmpresa.row($(this).parents()).data();
    console.log(data);
    let id = data.id;
    module.eliminar("Se eliminara la empresa", id, tablaEmpresa, "../processes/delete/eliminar-empresa.php");

  });

  $(document).on("click", "#btn-editar-empresa", function () {

    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc
    let id = data.id;
    window.location.replace(`index.html?id=${id}&edit=2&ruc=${ruc}`);
  });

  $(document).on("click", "#btn-sucursales", function () {
    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc;
    let nombre = data.nom_comercial;

    window.location.replace(`sucursales.html?ruc=${ruc}&nombre=${nombre}`);
  })

  $(document).on("click", "#btn-contactos", function () {
    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc;
    let nombre = data.nom_comercial;
    window.location.replace(`contactos.html?ruc=${ruc}&nombre=${nombre}`);
  })
});

// MostrarEmpresas();
// function MostrarEmpresas() {
//   $.ajax({
//     url: "../processes/mostrar-empresas.php",
//     type: "GET",
//     success: function (response) {
//       console.log(response);   
//       let empresas = JSON.parse(response);
//       let template = "";
//       console.log(empresas);
//       empresas.forEach((empresas) => {
//         template += `
//                           <tr>
//         <td>${empresas.id}</td>
//         <td>${empresas.nom_comercial}</td>
//         <td>${empresas.id_grupo}</td>
//         <td>${empresas.ruc}</td>
//          <td>${empresas.id_rubro}</td>
//         <td>${empresas.tipo_envio}</td>
//         <td><span class="badge badge-success">${empresas.estado}</span></td>
//         <td class="text-center">
//             <div class="list-icons">
//                 <div class="dropdown">
//                     <a href="#" class="list-icons-item" data-toggle="dropdown">
//                         <i class="icon-menu9"></i>
//                     </a>

//                     <div class="dropdown-menu dropdown-menu-right">
//                         <a href="#" class="dropdown-item"><i
//                                 class="icon-file-pdf" id="btn-editar-empresa"></i>
//                             Export to .pdf</a>
//                         <a href="#" class="dropdown-item"><i
//                                 class="icon-file-excel"></i>
//                             Export to .csv</a>
//                         <a href="#" class="dropdown-item"><i
//                                 class="icon-file-word"></i>
//                             Export to .doc</a>
//                     </div>
//                 </div>
//             </div>
//         </td>
//     </tr>
                                         


//           `;
//       });

//       $("#listado-empresas").html(template);
//     },
//   });
// }