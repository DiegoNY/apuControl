const valores = window.location.search;
const urlParams =  new URLSearchParams(valores);
let ruc = urlParams.get("ruc");
let nombre = urlParams.get("nombre");

let text = document.getElementById("texto-cambiante").innerText = `Contactos de la Empresa ${nombre}`;

cargarContactos(ruc);

function cargarContactos(ruc) {
    tablaContactos = $("#tabla_contactoss").DataTable({
      ajax: {
        url: "mostrar-contactos.php?id=" + ruc,
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
          defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-contacto"></i>`,
        },
        {
          defaultContent: `<i class="bi bi-x-circle-fill text-danger btn-delete-contacto"></i>`,
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