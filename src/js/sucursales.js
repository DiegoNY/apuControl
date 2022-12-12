const API = '../processes/mostrar-todas-sucursales.php'



$(document).ready(

    //empresa cargando data
    $("#tabla_sucursales").DataTable({
        "scrollCollapse": true,
        destroy: true,
        "paging": true,
        "order": [[0, 'desc'], [1, 'desc']],
        rowReorder: true,
        ajax: `${API}`,
        columns: [
            { data: "id" },
            { data: "id_empresa" },
            { data: "nombre" },
            { data: "codigo_cofide" },
            { data: "direccion" },
            { data: "ubigeo" },
            {
                defaultContent: `<div >
                          <i class="bi bi-shield-check btn-agregar-acceso text-success" id="accesos"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" ></i></div>
        `,
            }

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


$(document).on('click','#accesos', function () {

    /**
     * Capturamos el Id 
    **/

    let id  = this.parentElement.parentElement.parentElement.children[0].lastChild.data;

    cargarAccesos(id);

});




function cargarAccesos(id_sucursal) {

    tablaAccesos = $("#tabla_accesos").DataTable({
        
        destroy: true,
        "scrollCollapse": true,
        "searching": false,
        "paging": false,
        "order": [[0, 'desc'], [1, 'desc']],
        ajax: "../processes/mostrar-accesos.php?id=" + id_sucursal,
        columns: [

            { data  : "id"             },
            { data  : "id_sucursal"    },
            { data  : "nombreSistema"  },
            { data  : "nombreAcceso"   },
            { data  : "idAcceso"       },
            { data  : "contrasena"     },
        
        ],

        language: {
            
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _TOTAL_ Accesos",
            infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
            infoFiltered: "(Filtrado de _MAX_ total entradas)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: " ",
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


(async () => {

    await fetch('../processes/pruebaSession.php')
      .then(response => response.json())
      .then(nombre => {
  
  
        let usuario = nombre.usuario[0];
  
        if (usuario === null) {
  
          window.location.replace('login.html');
  
        } else {
  
          let nombreUsuario = document.getElementById('nombreUsuario').innerText = ` ${usuario}`;
          let nombreUsuario2 = document.getElementById('nombreUsuarioNav').innerText = ` ${usuario}`;
  
        }
      });
  
  
  })()