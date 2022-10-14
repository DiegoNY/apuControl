
$(document).ready(function () {
    $('#tabla-grupo').DataTable({
        scrollY: '420px',
        scrollCollapse: true,
        paging: true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "dom": '<"toolbar">Bftrp'
    });
});

function RegistrarGrupo() {
    $.ajax({
        type: "GET",
        data: $("#frm_grupo").serialize(),
        url: 'procesarGrupo.php',
        success: function (data) {
            //cuando se ingresen los grupos se motran en pantalla sin refrescar
            CargarGrupos();

            //muestra verde si se enviaron los datos cambiar por una alerta owo 
            const alerta = document.querySelector('#alerta');
            alerta.classList.toggle(data);
        }
    });
    //se reinicia el formulario cuando enviamos datos
    $('#frm_grupo').trigger('reset');
}


CargarGrupos();

function CargarGrupos() {
    $.ajax({
        url: 'mostrarGrupos.php',
        type: 'GET',
        success: function (response) {
            let grupos = JSON.parse(response);
            let templates = '';
            console.log(grupos);
            //recorriendo el grupo y mostrandolo en la tabla por ello se creo el template
            grupos.forEach(grupos => {
                templates += `
            <tr id-grupos="${grupos.id} ">
                <td>${grupos.id}</td>
                <td>${grupos.nombre}</td>
                <td>${grupos.descripcion}</td>
                <td>${grupos.fechaCreacion}</td>
                <td>${grupos.usuarioCreacion}</td>
                <td>${grupos.estado}</td>
                
                <td><i class="btn-edit"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>
                
                <td><i class="btn-delete"><img src="img/icons8-delete.svg" class="img-table text-center" alt=""></i></td>
            </tr>
            `
            });
            //pasamos el template al index
            $('#listado-grupos').html(templates);
        }
    });
}

EliminarGrupo();
function EliminarGrupo() {

    $(document).on('click', '.btn-delete', function () {
        //obteniendo toda la fila para poder obtener el id 
        if (confirm("Quieres eliminar el Grupo ?")) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('id-grupos');
            $.post('eliminarGrupo.php', { id }, function (response) {
                CargarGrupos();
            });
        }
    })
}

$(document).on('click', '.btn-edit', function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('id-grupos');
    $.post('escuchar-grupo.php', { id }, function (response) {
        let grupo = JSON.parse(response);
        $('#txtNombre').val(grupo.nombre);
        $('#txtDescripcion').val(grupo.descripcion);
        $('#txtEstado').val(grupo.estado);
        $('#txtUsuCre').val(grupo.usuarioCreacion);
        $('#txtFechCre').val(grupo.fechaCreacion);
    });

})
