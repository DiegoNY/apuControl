
// function MostrarEmpresas() {
//   $.ajax({
//     url: "mostrar-empresas.php",
//     type: "GET",
//     success: function (response) {
//       let empresas = JSON.parse(response);
//       let template = "";
//       console.log(empresas);
//       empresas.forEach((empresas) => {
//         template += `
//         <tr id-empresa="${empresas.id}">
//           <td scope="row" >${empresas.nom_comercial}</td>
//           <td scope="row" >${empresas.ruc}</td>
//           <td scope="row" >${empresas.razon_social}</td>
//           <td scope="row" >${empresas.id_ubigeo}</td>
//           <td scope="row" >${empresas.id_grupo}</td>
//           <td scope="row" >${empresas.id_rubro}</td>
//           <td scope="row" >${empresas.tipo_envio}</td>
//           <td scope="row" >${empresas.id_tipo_integracion}</td>
//           <td scope="row" >${empresas.fecha_registro}</td>
//           <td scope="row" >${empresas.estado_comercial}</td>
//           <td scope="row" >${empresas.tipo_persona}</td>
//           <td scope="row" >${empresas.estado}</td>
          
//           <td>
//             <div class="dropdown">
//               <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//                 options
//               </button>
//               <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                 <li><a class="dropdown-item" href="index.php?${empresas.id}&&${empresas.nombre}&&${empresas.ruc}">Editar</a></li>
//                 <li><a class="dropdown-item" href="#">Another action</a></li>
//                 <li><a class="dropdown-item" href="#">Something else here</a></li>
//               </ul>
//             </div>
//           </td>

//           <td><i class="btn-delete-empresa"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>

//         </tr>
//         `;
//       });

//       $("#listado-empresas").html(template);
//     },
//   });
// }


// eliminarEmpresa();
// function eliminarEmpresa() {
//   $(document).on("click", ".btn-delete-empresa", function () {
//     //ingresando a las propiedas de la tabla
//     let element = $(this)[0].parentElement.parentElement;
//     //capturando el id
//     let id = $(element).attr("id-empresa");
//     $.post("eliminar-empresa.php", { id }, function (response) {
//       MostrarEmpresas();
//       console.log(response);
//     });
//   });
// }

// CRUD GRUPOS 


// $(document).on("click", ".btn-edit", function () {
//     let element = $(this)[0].parentElement.parentElement;
//     let id = $(element).attr("id-grupos");
//     $.post("escuchar-grupo.php", { id }, function (response) {
//       let grupo = JSON.parse(response);
  
//       $("#id_grupo").val(grupo.id);
//       $("#txtNombre").val(grupo.nombre);
//       $("#txtDescripcion").val(grupo.descripcion);
//       $("#txtEstado").val(grupo.estado);
//       $("#txtUsuCre").val(grupo.usuarioCreacion);
//       $("#txtFechCre").val(grupo.fechaCreacion);
//       editar = true;
//     });
//   });

// CargarGrupos();

// function CargarGrupos() {
//   $.ajax({
//     url: "mostrarGrupos.php",
//     type: "GET",
//     success: function (response) {
//       let grupos = JSON.parse(response);
//       let templates = "";
//       //recorriendo el grupo y mostrandolo en la tabla por ello se creo el template
//       grupos.forEach((grupos) => {
//         templates += `
//             <tr id-grupos="${grupos.id} ">
//                 <td>${grupos.id}</td>
//                 <td>${grupos.nombre}</td>
//                 <td>${grupos.descripcion}</td>
//                 <td>${grupos.fechaCreacion}</td>
//                 <td>${grupos.usuarioCreacion}</td>
//                 <td>${grupos.estado}</td>
                
//                 <td><i class="btn-edit"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>
                
//                 <td><i class="btn-delete"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
//             </tr>
//             `;
//       });
//       //pasamos el template al index
//       $("#listado-grupos").html(templates);
//     },
//   });
// }

 // Se inicializan las tablas para evitar errores al momento de ingresar nuevos datos 

  // tablaGrupos = $("#tabla-grupos").DataTable({

  //   destroy: true,
  //   ajax: "mostrarGrupos.php",
  //   columns: [
  //     { data: "id" },
  //     { data: "nombre" },
  //     { data: "descripcion" },
  //     { data: "fechaCreacion" },
  //     { data: "usuarioCreacion" },
  //     {
  //       defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-grup"></i>`,
  //     },
  //     { defaultContent: `<i class="bi bi-x-circle-fill text-danger btn-delet-grup"></i>` },
  //   ],
  //   language: {
  //     decimal: "",
  //     emptyTable: "No hay información",
  //     info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
  //     infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
  //     infoFiltered: "(Filtrado de _MAX_ total entradas)",
  //     infoPostFix: "",
  //     thousands: ",",
  //     lengthMenu: "Mostrar _MENU_ Entradas",
  //     loadingRecords: "Cargando...",
  //     processing: "Procesando...",
  //     search: "Grupos :",
  //     zeroRecords: "Sin resultados encontrados",
  //     paginate: {
  //       first: "Primero",
  //       last: "Ultimo",
  //       next: "Siguiente",
  //       previous: "Anterior",
  //     },
  //   },
  // });

  // tableSucursal = $("#tabla_sucursals").DataTable({
  //   destroy: true,
  //   ajax: "mostrar-sucursal.php?id=1",
  //   columns: [
  //     { data: "id" },
  //     { data: "id_empresa" },
  //     { data: "nombre" },
  //     { data: "codigo_cofide" },
  //     { data: "direccion" },
  //     { data: "ubigeo" },
  //     {
  //       defaultContent: `
  //       <i class="bi bi-pencil-square btn-edit-sucursal"></i>
  //       <i class="bi bi-person-plus btn-agregar-acceso"></i>
  //       `,
  //     },
  //     {
  //       defaultContent: `<i class="bi bi-x-circle-fill btn-delete-sucursal"></i>`,
  //     },
  //   ],
  //   language: {
  //     decimal: "",
  //     emptyTable: "No hay información",
  //     info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
  //     infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
  //     infoFiltered: "(Filtrado de _MAX_ total entradas)",
  //     infoPostFix: "",
  //     thousands: ",",
  //     lengthMenu: "Mostrar _MENU_ Entradas",
  //     loadingRecords: "Cargando...",
  //     processing: "Procesando...",
  //     search: "Sucursal",
  //     zeroRecords: "Sin resultados encontrados",
  //     paginate: {
  //       first: "Primero",
  //       last: "Ultimo",
  //       next: "Siguiente",
  //       previous: "Anterior",
  //     },
  //   },
  // });

  // tablaContactos = $("#tabla_contactoss").DataTable({
  //   destroy: true,
  //   ajax: "mostrar-contactos.php?id=1",
  //   columns: [
  //     { data: "id" },
  //     { data: "id_empresa" },
  //     { data: "nombre" },
  //     { data: "cargo" },
  //     { data: "telefono" },
  //     { data: "correo" },
  //     {
  //       defaultContent: `<i class="bi bi-pencil-square btn-edit-contacto"></i>`,
  //     },
  //     {
  //       defaultContent: `<i class="bi bi-x-circle-fill btn-delete-contacto"></i>`,
  //     },
  //   ],
  //   language: {
  //     decimal: "",
  //     emptyTable: "No hay información",
  //     info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
  //     infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
  //     infoFiltered: "(Filtrado de _MAX_ total entradas)",
  //     infoPostFix: "",
  //     thousands: ",",
  //     lengthMenu: "Mostrar _MENU_ Entradas",
  //     loadingRecords: "Cargando...",
  //     processing: "Procesando...",
  //     search: "Contactos ",
  //     zeroRecords: "Sin resultados encontrados",
  //     paginate: {
  //       first: "Primero",
  //       last: "Ultimo",
  //       next: "Siguiente",
  //       previous: "Anterior",
  //     },
  //   },
  // });


//   $(document).on("click", "#btn-sucursales", function () {
//     let data = tablaEmpresa.row($(this).parents()).data();
//     let ruc = data.ruc;
//     let nombre = data.nom_comercial;

//     window.location.replace(`sucursales.html?ruc=${ruc}&nombre=${nombre}`);
//   })



