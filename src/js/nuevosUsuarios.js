
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

                var user = nombre.usuario[1]

                var registro = document.getElementById('registrarEmpresa');
                var infoSis = document.getElementById('registrarInformacionSistema');
                var btnR = document.getElementById("tabla_empresasas_length");

                var btnDc = document.getElementById("detalleContacto");
                var btnDs = document.getElementById("detalleSucursal");



                let nombreUsuario = document.getElementById('nombreUsuario').innerText = ` ${usuario}`;
                let nombreUsuario2 = document.getElementById('nombreUsuarioNav').innerText = ` ${usuario}`;

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
                            link3.setAttribute('class', 'nav-link');
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

                            menu.appendChild(navigation5);

                            break;


                        default:
                            console.log("default");
                            break;

                    }
                })

            }
        });


})()


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
                    TieneValores('.modulos ');

                };

                
                if(data.id == 2) Error('.usuario'); 


                return;
            }

            swal.fire(
                'Se Ingreso correctamente',
                '',
                'success'
            );


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

async function Modulos() {

    const response = await fetch('../processes/ModulosExistente.php', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }

    })

    const data = await response.json();

    let containerModulos = document.querySelector('.multiselect-container');

    data.modulos.forEach(modulo => {

        let modulos = document.createElement('div');
        modulos.setAttribute('class', 'multiselect-item dropdown-item');
        let label = document.createElement('label');
        label.setAttribute('class', 'form-check flex-1 mb-0');
        let labelInput = document.createElement('input');
        labelInput.setAttribute('class', 'form-check-input');
        labelInput.setAttribute('value', `${modulo.id}`);
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

function postData(urlAPI, data) {

    const response = fetch(urlAPI,
        {
            method: 'POST',
            body: data,
        }
    );

    return response;

}




RellenandoCamposFaltantes('.usuario');
RellenandoCamposFaltantes('.contraseña');
RellenandoCamposFaltantes('.cargo');
RellenandoCamposFaltantes('.modulos ');


Modulos();