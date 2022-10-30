const valores = window.location.search;
const urlParams =  new URLSearchParams(valores);

const id = urlParams.get("id");
const nombre = urlParams.get("nombre");
const ruc = urlParams.get("ruc");
const nombreEmpresa = urlParams.get("empresa");
const text = document.getElementById("texto-cambiante").innerText = `Mostrando Accesos de la Sucursal ${nombre}`;


cargarAccesos(id);

function cargarAccesos(id_sucursal) {
    tablaAccesos = $("#tabla_accesos").DataTable({
      ajax: "../processes/mostrar-accesos.php?id=" + id_sucursal,
      columns: [
        { data: "id" },
        { data: "id_sucursal" },
        { data: "nombreAcceso" },
        { data: "idAcceso" },
        { data: "contrasena" },
        {
          defaultContent: `<i class="bi bi-pencil-square text-warning btn-edit-acceso"></i>`,
        },
        {
          defaultContent: `<i class="bi bi-x-circle-fill text-danger btn-delete-acceso"></i>`,
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
        search: "Accesos ",
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

$(document).on("click",".btn-volver",function(){
  window.location.replace(`sucursales.html?ruc=${ruc}&nombre=${nombreEmpresa}`)
})
