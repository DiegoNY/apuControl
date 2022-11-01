
const valores = window.location.search;
const urlParams =  new URLSearchParams(valores);
const ruc = urlParams.get("ruc");
const nombres = urlParams.get("nombre");
const text = document.getElementById("texto-cambiante").innerText = `Sucursales de la Empresa ${nombres}`;


cargarSucursal(ruc);
function cargarSucursal(ruc) {
  
    tableSucursal = $("#tabla_sucursals").DataTable({
      ajax: "../processes/mostrar-sucursal.php?id=" + ruc,
      columns: [
        { data: "id" },
        { data: "id_empresa" },
        { data: "nombre" },
        { data: "codigo_cofide" },
        { data: "direccion" },
        { data: "ubigeo" },
        {
          defaultContent: `
                            <i class="bi bi-shield-check btn-ver-acceso  text-center text-success"></i>
                            <i class="bi bi-x-circle-fill text-danger btn-delete-sucursal"></i>
          `
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

$(document).on("click",".btn-ver-acceso",function(){
  let data = tableSucursal.row($(this).parents()).data();
  let id = data.id;
  let nombre = data.nombre;
  window.location.replace(`accesos.html?id=${id}&nombre=${nombre}&ruc=${ruc}&empresa=${nombres}`);
})
