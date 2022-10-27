
$(document).ready(function () {
  //empresa cargando data
  let tablaEmpresa = $("#tabla_empresasas").DataTable({
    destroy: true,
    ajax: "mostrar-empresas.php",
    columns: [
      { data: "id" },
      {
        data: 'logo', "render": function (data, type, row) {
          return `<center><img src="${data}" style="width:50px; height:50px;"></center>`
        }
      },
      { data: "nom_comercial" },
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
      <i class="bi bi-calendar3 text-primary"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li id="btn-editar-empresa"><a class="dropdown-item">Editar</a></li>
        <li id="btn-nose"><a class="dropdown-item" >Another action</a></li>
        <li id="btn-nose"><a class="dropdown-item" >Another action</a></li>
      </ul>
    </div>`,
      },
      { defaultContent: `<i class="bi bi-x-circle-fill text-danger btn-delet"></i>` },
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
      "search": "Empresas",
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
    const module = await import('./main.js');

    let data = tablaEmpresa.row($(this).parents()).data();
    console.log(data);
    let id = data.id;
    module.eliminar("Se eliminara la empresa",id,tablaEmpresa,"eliminar-empresa.php");
    
  });

  $(document).on("click", "#btn-editar-empresa", function () {

    let data = tablaEmpresa.row($(this).parents()).data();
    let id = data.id;
    window.location.replace(`index.php?id=${id}&edit=2`);
  });
});
