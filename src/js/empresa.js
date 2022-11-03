
$(document).ready(function () {
  //empresa cargando data
  let tablaEmpresa = $("#tabla_empresasas").DataTable({
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    destroy: true,
    "scrollY": "358px",
    "scrollCollapse": true,
    "paging": false,
    "order": [[0, 'desc'], [1, 'desc']],
    rowReorder: true,
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
        <li  data-bs-toggle="modal" data-bs-target="#sucursales" id="btn-sucursales"><a class="dropdown-item"  >Sucursales</a></li>
        <li  data-bs-toggle="modal" data-bs-target="#contactos" id="btn-contactos"><a class="dropdown-item" >Contactos</a></li>
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

    cargarSucursal(ruc);

  })

  $(document).on("click", "#btn-contactos", function () {
    let data = tablaEmpresa.row($(this).parents()).data();
    let ruc = data.ruc;

    cargarContactos(ruc)

  })

  function cargarSucursal(ruc) {

    tableSucursal = $("#tabla_sucursals").DataTable({
      destroy: true,
      "scrollY": "358px",
      "scrollCollapse": true,
      "paging": false,
      "order": [[0, 'desc'], [1, 'desc']],
      ajax: "../processes/mostrar-sucursal.php?id=" + ruc,
      columns: [
        { data: "id" },
        { data: "id_empresa" },
        { data: "nombre" },
        { data: "codigo_cofide" },
        { data: "direccion" },
        { data: "ubigeo" },
        {
          defaultContent: `<div class="contenedor-iconos"><i class="bi bi-pencil-square text-warning btn-edit-sucursal"></i>
                            <i class="bi bi-shield-check btn-agregar-acceso text-success"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                            <i class="bi bi-x-circle-fill text-danger btn-delete-sucursal"></i>
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
        lengthMenu: "Mostrar _MENU_ Entradas",
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

  function cargarContactos(ruc) {
    tablaContactos = $("#tabla_contactoss").DataTable({
      "scrollY": "358px",
      "scrollCollapse": true,
      "paging": false,
      "order": [[ 0, 'desc' ], [ 1, 'desc' ]],
      destroy:true,
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
          defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-contacto"></i>
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
        lengthMenu: "Mostrar _MENU_ Entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Contactos ",
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
  

});
