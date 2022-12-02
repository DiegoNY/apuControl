

$(document).ready(

    //empresa cargando data
    $("#tabla_contactos").DataTable({
    "scrollCollapse": true,
    destroy: true,
    "paging": true,
    "order": [[0, 'desc'], [1, 'desc']],
    rowReorder: true,
    ajax: "../processes/mostrar-todos-contactos.php",
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "cargo" },
      { data: "telefono" },
      { data: "correo" },

    ],
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Empresas",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "   ",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "",
      "searchPlaceholder": "Buscar por..",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
      },
    }

  })


)