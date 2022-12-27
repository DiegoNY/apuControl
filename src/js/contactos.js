const MODULO = 2;

(() => {

  fetch('../processes/pruebaSession.php')
    .then(response => response.json())
    .then(nombre => {


      let usuario = nombre.usuario[0];

      if (usuario === null) {

        window.location.replace('login.html');
        return;

      } else {

        let use = nombre.usuario[1];


        var permiso = false;
        var modulosAcceder = []
        nombre.usuario.permisos.forEach(permisos => {

          if (permisos.modulo == MODULO) permiso = true;

          modulosAcceder.push(permisos.modulo);

        })

        if (!permiso) window.location.replace('../processes/validator/CargaModulosPermitidos.php');

        let menu = document.querySelector('#navigationMenu');
        modulosAcceder.forEach(modulos => {

          switch (true) {
            case modulos == 1:


              let navigation1 = document.createElement('li');
              navigation1.setAttribute('class', 'nav-item');
              navigation1.setAttribute('id', 'registrarEmpresa');
              let link1 = document.createElement('a');
              link1.setAttribute('href', 'index.html');
              link1.setAttribute('class', 'nav-link');
              let img1 = document.createElement('i');
              img1.setAttribute('class', 'bi bi-bookmark-plus');
              let span1 = document.createElement('span');
              span1.innerText = ' Registrar Empresas';

              link1.appendChild(img1);
              link1.appendChild(span1);

              navigation1.appendChild(link1);

              menu.appendChild(navigation1);

              break;
            case modulos == 2:

              let navigation3 = document.createElement('li');
              navigation3.setAttribute('class', 'nav-item');
              navigation3.setAttribute('id', 'detalleContacto');
              let link3 = document.createElement('a');
              link3.setAttribute('href', 'vista-contactos.html');
              link3.setAttribute('class', 'nav-link active');
              let img3 = document.createElement('i');
              img3.setAttribute('class', 'bi bi-person-rolodex');
              let span3 = document.createElement('span');
              span3.innerText = '   Detalle contactos  ';

              link3.appendChild(img3);
              link3.appendChild(span3);

              navigation3.appendChild(link3);

              menu.appendChild(navigation3);


              console.log('Acceso' + modulos)

              break;

            case modulos == 3:



              let navigation2 = document.createElement('li');
              navigation2.setAttribute('class', 'nav-item');
              navigation2.setAttribute('id', 'registrarInformacionSistema');
              let link2 = document.createElement('a');
              link2.setAttribute('href', 'vista-registro-sistemas.html');
              link2.setAttribute('class', 'nav-link');
              let img2 = document.createElement('i');
              img2.setAttribute('class', 'bi bi-archive');
              let span2 = document.createElement('span');
              span2.innerText = '  Informacion del Sistema ';

              link2.appendChild(img2);
              link2.appendChild(span2);

              navigation2.appendChild(link2);

              menu.appendChild(navigation2);

              console.log('Acceso' + modulos)

              break;


            case modulos == 4:

              let navigation4 = document.createElement('li');
              navigation4.setAttribute('class', 'nav-item');
              navigation4.setAttribute('id', 'detalleContacto');
              let link4 = document.createElement('a');
              link4.setAttribute('href', 'vista-empresa.html');
              link4.setAttribute('class', 'nav-link');
              let img4 = document.createElement('i');
              img4.setAttribute('class', 'icon-home4');
              let span4 = document.createElement('span');
              span4.innerText = '   Listar Empresa  ';

              link4.appendChild(img4);
              link4.appendChild(span4);

              navigation4.appendChild(link4);

              menu.appendChild(navigation4);


              console.log('Acceso' + modulos)

              console.log('Acceso' + modulos)

              break;

            case modulos == 5:

              let navigation5 = document.createElement('li');
              navigation5.setAttribute('class', 'nav-item');
              navigation5.setAttribute('id', 'registroUsuario');
              let link5 = document.createElement('a');
              link5.setAttribute('href', 'registro-usuarios.html');
              link5.setAttribute('class', 'nav-link');
              let img5 = document.createElement('i');
              img5.setAttribute('class', 'bi bi-person-plus');
              let span5 = document.createElement('span');
              span5.innerText = ' Registrar usuario';

              link5.appendChild(img5);
              link5.appendChild(span5);
              navigation5.appendChild(link5);

              console.log(navigation5);
              menu.appendChild(navigation5);

              console.log('Acceso' + modulos)

              break;


            default:
              console.log("default");
              break;

          }
        })

        if (!permiso) window.location.replace('vista-empresa.html');

        let nombreUsuario = document.getElementById('nombreUsuario').innerText = ` ${usuario}`;
        let nombreUsuario2 = document.getElementById('nombreUsuarioNav').innerText = ` ${usuario}`;

      }
    });


})()

$(document).ready(

  //empresa cargando data
  $("#tabla_contactos").DataTable({
    "scrollCollapse": true,
    destroy: true,
    "paging": true,
    "order": [[0, 'desc'], [1, 'desc']],
    rowReorder: true,
    ajax: "../processes/mostrar-todos-contactos.php",
    columns: [
      { data: "id" },
      { data: "id_empresa" },
      { data: "nombre" },
      { data: "cargo" },
      { data: "telefono" },
      { data: "correo" },

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