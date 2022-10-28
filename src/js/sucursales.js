
const valores = window.location.search;
const urlParams =  new URLSearchParams(valores);

let ruc = urlParams.get("ruc");
let nombre = urlParams.get("nombre");
let text = document.getElementById("texto-cambiante").innerText = `Sucursales de la Empresa ${nombre}`;




cargarSucursal(ruc);

function cargarSucursal(ruc) {
    tableSucursal = $("#tabla_sucursals").DataTable({
      ajax: "mostrar-sucursal.php?id=" + ruc,
      columns: [
        { data: "id" },
        { data: "id_empresa" },
        { data: "nombre" },
        { data: "codigo_cofide" },
        { data: "direccion" },
        { data: "ubigeo" },
        {
          defaultContent: `<div class="contenedor-iconos"><i class="bi bi-pencil-square text-warning btn-edit-sucursal"></i>
                            <i class="bi bi-shield-check btn-agregar-acceso text-success"></i></div>
          `,
        },
        {
          defaultContent: `<i class="bi bi-x-circle-fill text-danger btn-delete-sucursal"></i>`,
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
        search: "Sucursales :",
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
