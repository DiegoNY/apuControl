
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
            <tr>
                <td>${grupos.id}</td>
                <td>${grupos.nombre}</td>
                <td>${grupos.descripcion}</td>
                <td>${grupos.fechaCreacion}</td>
                <td>${grupos.usuarioCreacion}</td>
                <td>${grupos.estado}</td>
                <td><i class="btn-delete"><img src="img/icons8-bookmark.svg" class="img-table text-center" alt=""></i></td>
            </tr>
            `
            });
            //pasamos el template al index
            $('#listado-grupos').html(templates);
        }
    });
}

$(document).on('click','.btn-delete',function(){
   //console.log('Funciono no me preciones aaa!') 
    let element =  $(this)[0].parentElement.parentElement;
    console.log(element);
    // if(confirm('Estas seguro de borrarlo ?')){
       
    // }
})

//llamar atravez de un boton 
function EliminarGrupo(id) {

    $.ajax({
        type: "POST",
        data: $("#id").val(),
        url: 'eliminarGrupo.php',
        success: function (data) {
            console.log(data);
        }
    })
}