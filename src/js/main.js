const alerta = document.querySelector();

$(document).ready(function() {
    $('#grupo').DataTable({
        scrollY: '420px',
        scrollCollapse: true,
        paging: true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "dom": '<"toolbar">Bftrp'
    });
});

function RegistrarGrupo()
{
    $.ajax({
        type : "GET",
        data : $("#frm_grupo").serialize(),
        url : 'procesarGrupo.php',
        success: function(data)
        {
        //muestra verde si se enviaron los datos
        const alerta = document.querySelector('#alerta');
        alerta.classList.toggle(data);
        }
    })
}

function EliminarGrupo(){

    $.ajax({
        type : "POST",
        data: $("#id").val(),
        url : 'eliminarGrupo.php',
        success : function(data)
        {
            console.log(data);
        }
    })

}