
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);

const MODULO = 5;
const REGISTRO = '../processes/register/RegistrarUsuarios.php';

/**
 * Validando Si el usuario tiene Accesos
 */
(async () => {

    await fetch('../processes/pruebaSession.php')
        .then(response => response.json())
        .then(nombre => {

            console.log(nombre);
            let usuario = nombre.usuario[0];

            if (usuario === null) {

                window.location.replace('login.html');

            } else {

                nombre.usuario[1]

                document.getElementById('registrarEmpresa');
                document.getElementById('registrarInformacionSistema');
                document.getElementById("tabla_empresasas_length");

                document.getElementById("detalleContacto");
                document.getElementById("detalleSucursal");



                document.getElementById('nombreUsuario').innerText = ` ${usuario}`;
                document.getElementById('nombreUsuarioNav').innerText = ` ${usuario}`;

                var permiso = false;
                var modulosAcceder = [];


                nombre.usuario.permisos.forEach(permisos => {

                    if (permisos.modulo == MODULO) permiso = true;

                    modulosAcceder.push(permisos.modulo);

                })

                if (!permiso) window.location.replace('../processes/validator/CargaModulosPermitidos.php');

                let MantenimientoEmpresa = false ;
                let listadoContactos  = false
                let sistema  = false
                let ListadoEmpresa  = false
                let registro  = false

                modulosAcceder.forEach(modulos => {

                    switch (true) {

                        case modulos == 1:

                            MantenimientoEmpresa = CrearMenuItem('index.html', 'registrarEmpresa', 'bi bi-bookmark-plus', 'Mantenimiento Empresa');

                            break;

                        case modulos == 2:

                            listadoContactos = CrearMenuItem('vista-contactos.html', 'detalleContacto', 'bi bi-person-rolodex', 'Listado contactos');


                            break;

                        case modulos == 3:

                            sistema = CrearMenuItem('vista-registro-sistemas.html', 'registrarInformacionSistema', 'bi bi-archive', ' Mantenimiento de Sistema ')


                            break;

                        case modulos == 4:

                            ListadoEmpresa = CrearMenuItem('vista-empresa.html', 'detalleContacto', 'icon-home4', 'Listado de Empresa');
                            break;

                        case modulos == 5:

                            registro = CrearMenuItem('registro-usuarios.html', 'registroUsuario', 'bi bi-person-plus', 'Registrar usuario', true);
                            break;


                        default:
                            console.log("default");
                            break;

                    }
                })

                let menu = document.querySelector('#navigationMenu');
                let subMenus = CrearSubMenu('Sistema', 'icon-copy');

                menu.appendChild(ListadoEmpresa);
                menu.appendChild(listadoContactos);
                menu.appendChild(subMenus);


                /**
                 * nav-item-open / display block cuando se de click 
                 */

                let subMenu = document.querySelector('#subMenu');
                if(MantenimientoEmpresa)
                subMenu.appendChild(MantenimientoEmpresa);
                if(sistema)
                subMenu.appendChild(sistema);
                if(registro)
                subMenu.appendChild(registro);


            }
        });

    ValidadorModulo(MODULO);

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


})()


/**
 * UI toggle SubMenu
 */



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

function ValidadorModulo(nmrModulo) {
    let arrModulos = [1, 3, 5]
    let estaDentroUnSubmenu = arrModulos.find(element => element == nmrModulo);
    let subMenuSubMenu = document.querySelector('#subMenu');
    let subMenu = document.querySelector('#subMenuss');



    if (estaDentroUnSubmenu) {

        subMenu.classList.add('nav-item-open');
        subMenuSubMenu.setAttribute('style', 'display:block;');

    }

}

function RegistrarUsuario() {

    /**
     * Obtienen Los Datos a Enviar
     */
    let formulario = document.querySelector('#form-users');
    const DataUsuarios = new FormData(formulario);

    /**
     * Se envian Datos y Obtiene Respuesta
     */
    postData(REGISTRO, DataUsuarios)
        .then(response => response.json())
        .then(data => {

            if (data.Error) {

                swal.fire(`<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' />`, `Error ${data.Error}`)


                if (data.id == 1) {

                    TieneValores('.usuario');
                    TieneValores('.contraseña');
                    TieneValores('.cargo');


                };


                if (data.id == 2) Error('.usuario');


                return;
            }

            swal.fire(
                'Se Ingreso correctamente',
                '',
                'success'
            );


        });

}


const Editar = () => {

    let formulario = document.querySelector('#formEditar')
    const DataUsuaio = new FormData(formulario);
    const EDITAR = "../processes/MantenimientoUsuarios.php?accion=Editar";

    postData(EDITAR, DataUsuaio)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            swal.fire('', `${data.Respuesta}`, 'success')


        });



}

const Eliminar = (elemento) => {

    let id = elemento.parentElement.parentElement.children[0].childNodes[0].data;

    let contenedor = elemento.parentElement.parentElement;



    swal.fire({

        title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' />  `,
        icon: '',
        text: "Estas seguro de eliminarlo ?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar ahora'

    }).then((result) => {



        if (result.isConfirmed) {

            Swal.fire(
                'Eliminado!',
                '',
                'success'
            )

            postData(`../processes/MantenimientoUsuarios.php?accion=Eliminar&&id=${id}`)
                .then(response => response.json())
                .then(data => console.log(data));

            contenedor.remove();

        }
    })



}

const CargarDatosUsuario = (elemento) => {

    /**
    * Cargando Los Modulos
    */

    let containerModulo = document.querySelector('.modulo');
    containerModulo.replaceChildren("");


    /**
     * Obteniendo Datos
     */
    let id = elemento.parentElement.parentElement.children[0].childNodes[0]?.data;

    postData(`../processes/MantenimientoUsuarios.php?accion=Usuario&&id=${id}`)
        .then(response => response.json())
        .then(data => {


            id = data.Usuario[0].id;
            cargo = data.Usuario[0].cargo;
            contraseña = data.Usuario[0].contraseña;
            usuario = data.Usuario[0].usuario;


            document.querySelector('#exampleModalLabel').innerText = `Usuario ${usuario}`;
            document.querySelector('#usuario').value = usuario;

            if (contraseña == undefined) contraseña = "";
            document.querySelector('#Contraseña').value = contraseña;

            if (cargo == undefined) cargo = "";
            document.querySelector('#cargo').value = cargo;

            if (id == undefined) id = "";
            document.querySelector('#idUsuario').value = id;

            let inputUsuario = document.querySelector('#usuario')
            inputUsuario.setAttribute('value', usuario);
            let inputContraseña = document.querySelector('#Contraseña')
            inputContraseña.setAttribute('value', contraseña);

            let inputCargo = document.querySelector('#cargo')
            inputCargo.setAttribute('value', cargo);

            console.log(data);

            arrPermisos = [];

            data.Usuario[0].permisos.forEach(permiso => {

                arrPermisos.push(permiso);

            });

            console.log(arrPermisos);
            /**
             * Marcando los modulos
             */

            Modulos('.modulo', arrPermisos);


        });

}

/**
 * Validacion de INFORMACION
 */

const Error = (clase) => {

    document.querySelector(clase).classList.add('is-invalid');

}

const TieneValores = (clase) => {



    let valores = document.querySelector(clase).value;


    if (!valores) document.querySelector(clase).classList.add('is-invalid');


}

const RellenandoCamposFaltantes = (input = false, inputContenedor = false) => {

    if (inputContenedor) document.querySelector(inputContenedor).addEventListener('click', () => {


        document.querySelector(inputContenedor).classList.remove('campo-faltante');
        return;

    })


    if (input) document.querySelector(input).addEventListener('click', () => {

        document.querySelector(input).classList.remove('is-invalid');

    })


}


/**
 * Obtencio y envio de datos 
 */

async function Modulos(contenedor = false, idModulo = false) {

    /**
     * Obteniendo la data y parseandola a json 
     */
    const response = await fetch('../processes/ModulosExistente.php', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })

    const data = await response.json();

    /**
     * Rellenando el contenedor de modulos
     */
    let containerModulos;

    if (contenedor) containerModulos = document.querySelector(contenedor);

    if (!contenedor) containerModulos = document.querySelector('.multiselect-container');

    data.modulos.forEach(modulo => {

        let modulos = document.createElement('div');
        modulos.setAttribute('id_modulo', modulo.id);
        modulos.setAttribute('class', 'multiselect-item dropdown-item');
        let label = document.createElement('label');
        label.setAttribute('class', 'form-check flex-1 mb-0');
        let labelInput = document.createElement('input');
        labelInput.setAttribute('class', 'form-check-input');
        labelInput.setAttribute('value', `${modulo.id}`);

        /**
         * marcar el modulo al editar  
         */

        if (idModulo) {

            let valor = idModulo.find(elemento => elemento == modulo.id)

            if (valor) labelInput.setAttribute('checked', '');

        }


        labelInput.setAttribute('name', 'modulos[]');
        labelInput.setAttribute('type', 'checkbox');
        let span = document.createElement('span');
        span.setAttribute('class', 'form-check-label w-100');
        span.innerText = modulo.nombre
        label.appendChild(labelInput);
        label.appendChild(span);
        modulos.appendChild(label);
        console.log(modulos);
        containerModulos.appendChild(modulos);

    });



}

async function postData(urlAPI, data) {

    const response = await fetch(urlAPI,
        {
            method: 'POST',
            body: data,
        }
    );

    return response;

}

async function getData(urlAPI) {

    const response = await fetch(urlAPI);
    const data = await response.json();

    return data;

}




RellenandoCamposFaltantes('.usuario');
RellenandoCamposFaltantes('.contraseña');
RellenandoCamposFaltantes('.cargo');
RellenandoCamposFaltantes('.modulos ');

var lenguaje = {
    "decimal": "",
    "emptyTable": "No hay información",
    "info": "",
    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "   <button type='button' class='btn btn-primary' data-bs-target='#registroModal' data-bs-toggle='modal' id='AgregarUsuario' '> Agregar Usuario +</button>",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "",
    "searchPlaceholder": "Buscar por..",
    "zeroRecords": "Sin resultados encontrados",
    "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "<i class='fi fi-rr-angle-right'></i>",
        "previous": "<i class='fi fi-rr-angle-left'></i>",
    },
}

$(document).ready(function () {

    var table = $("#tablaUsuario").DataTable({
        destroy: true,
        "scrollCollapse": true,
        "paging": true,
        "order": [[0, 'desc'], [1, 'desc']],
        ajax: {
            url: "../processes/MantenimientoUsuarios.php?accion=Mostrar",
        }
        ,
        columns: [
            { data: "id" },
            { data: "usuario" },
            { data: "contraseña" },
            { data: "cargo" },
            { defaultContent: '' },
            { defaultContent: '<td class="text-center row "><i role="button" class="fi fi-rr-edit ml-2 mr-2 text-primary" onclick="CargarDatosUsuario(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"></i><i  role="button" class="fi fi-rr-trash text-danger" onclick="Eliminar(this)"></i></td>' },

        ],
        language: lenguaje
    });

    table.columns.adjust();


    btnAgregar = document.getElementById('AgregarUsuario');

    btnAgregar.addEventListener('click', () => {
        let containerModulo = document.querySelector('#contenedorModulos');
        containerModulo.replaceChildren("");
        Modulos('#contenedorModulos');
    })

    /**
     * estilos a tabla 
     */

    let tabla = document.querySelector('#tablaUsuario_wrapper');
    console.log(tabla);

    tabla.setAttribute('class', 'dataTables_wrapper no-footer shadow p-3 mb-5  rounded');

    let tablaUsuario = document.querySelector('#tablaUsuario');
    tablaUsuario.setAttribute('class', 'table shadow-sm   rounded dataTable no-footer')

});

