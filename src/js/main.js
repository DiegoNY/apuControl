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
            console.log(data);
        }
    })
}