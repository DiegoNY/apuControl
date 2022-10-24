$(document).ready(function () {
  //empresa cargando data
  let tablaEmpresa = $("#tabla_empresasas").DataTable({
    ajax: "mostrar-empresas.php",
    columns: [
      { data: "id" },
      { data: "ruc" },
      { data: "razon_social" },
      { data: "id_ubigeo" },
      { data: "id_grupo" },
      { data: "id_rubro" },
      { data: "tipo_envio" },
      { data: "id_tipo_integracion" },
      { data: "fecha_registro" },
      { data: "estado_comercial" },
      { data: "tipo_persona" },
      { data: "estado" },
      {
        defaultContent: `<div class="dropdown  ">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-calendar3"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li id="btn-editar-empresa"><a class="dropdown-item">Editar</a></li>
        <li id="btn-nose"><a class="dropdown-item" >Another action</a></li>
        <li id="btn-nose"><a class="dropdown-item" >Another action</a></li>
      </ul>
    </div>`,
      },
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
  });
  
});
