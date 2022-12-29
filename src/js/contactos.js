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

        let MantenimientoEmpresa = false;
        let listadoContactos = false
        let sistema = false
        let ListadoEmpresa = false
        let registro = false

        modulosAcceder.forEach(modulos => {

          switch (true) {

            case modulos == 1:

              MantenimientoEmpresa = CrearMenuItem('index.html', 'registrarEmpresa', 'fi fi-rr-building', 'Mantenimiento Empresa');

              break;

            case modulos == 2:

              listadoContactos = CrearMenuItem('vista-contactos.html', 'detalleContacto', 'bi bi-person-rolodex', 'Listado contactos', true);


              break;

            case modulos == 3:

              sistema = CrearMenuItem('vista-registro-sistemas.html', 'registrarInformacionSistema', 'bi bi-archive', ' Mantenimiento de Sistema ')


              break;

            case modulos == 4:

              ListadoEmpresa = CrearMenuItem('vista-empresa.html', 'detalleContacto', 'icon-home4', 'Listado de Empresa');
              break;

            case modulos == 5:

              registro = CrearMenuItem('registro-usuarios.html', 'registroUsuario', 'bi bi-person-plus', 'Registrar usuario');
              break;


            default:
              console.log("default");
              break;

          }
        })


        let menu = document.querySelector('#navigationMenu');
        menu.innerHTML = '';
        let subMenus = CrearSubMenu('Sistema', 'icon-copy');

        if (ListadoEmpresa)
          menu.appendChild(ListadoEmpresa);
        if (listadoContactos)
          menu.appendChild(listadoContactos);
        menu.appendChild(subMenus || "");


        /**
         * nav-item-open / display block cuando se de click 
         */

        let subMenu = document.querySelector('#subMenu');


        if (MantenimientoEmpresa)
          subMenu.appendChild(MantenimientoEmpresa);
        if (sistema)
          subMenu.appendChild(sistema);
        if (registro)
          subMenu.appendChild(registro);


        if (!permiso) window.location.replace('vista-empresa.html');

       
        /**
         * Lazy loading
         */
         let conteinerNombreUsuario1 = document.getElementById('nombreUsuario');
         conteinerNombreUsuario1.classList.remove('container-nombre-usuario');
         conteinerNombreUsuario1.innerText = ` ${usuario}`;
 
         let conteinerNombreUsuario2 = document.querySelector('#nombreUsuarioNav');
         conteinerNombreUsuario2.classList.remove('container-nombre-usuario')
        conteinerNombreUsuario2.innerText = ` ${usuario}`;

      }

      document.querySelector('#subMenuss').addEventListener('click', () => {
        let subMenu = document.querySelector('#subMenuss');
        let subMenuSubMenu = document.querySelector('#subMenu');

        let estaAbierto = document.querySelector('#subMenuss').classList.contains('nav-item-open');
        console.log(subMenu);

        if (!estaAbierto) {
          subMenu.classList.add('nav-item-open');
          subMenuSubMenu.setAttribute('style', 'display:block;');

        } else {
          subMenu.classList.remove('nav-item-open');
          subMenuSubMenu.setAttribute('style', 'display:none;');

        }

      })
    });




})()

function CrearMenuItem(links, idNavigation, icono, texto, activo = false) {

  let navigation = document.createElement('li');
  navigation.setAttribute('class', 'nav-item');
  navigation.setAttribute('id', idNavigation);
  let link = document.createElement('a');
  link.setAttribute('href', links);

  if (activo)
    link.setAttribute('class', 'nav-link active');
  if (!activo)
    link.setAttribute('class', 'nav-link');

  let img = document.createElement('i');
  img.setAttribute('class', icono);
  let span1 = document.createElement('span');
  span1.innerText = texto;

  link.appendChild(img);
  link.appendChild(span1);

  navigation.appendChild(link);


  return navigation;
}


function CrearSubMenu(nombreSubMenu, iconoSubMenu) {


  let contenedor = document.createElement('li');
  contenedor.setAttribute('class', 'nav-item nav-item-submenu')
  contenedor.setAttribute('id', 'subMenuss');

  let nombre = document.createElement('a');
  nombre.setAttribute('class', 'nav-link');
  let icono = document.createElement('i');
  icono.setAttribute('class', iconoSubMenu);
  let span = document.createElement('span');
  span.innerText = nombreSubMenu
  nombre.appendChild(icono);
  nombre.appendChild(span);

  let ul = document.createElement('ul');
  ul.setAttribute('class', 'nav nav-group-sub')
  ul.setAttribute('style', 'display:none;')
  ul.setAttribute('data-submenu-title', 'Layouts')
  ul.setAttribute('id', 'subMenu');

  contenedor.appendChild(nombre);
  contenedor.appendChild(ul);

  return contenedor;


}

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