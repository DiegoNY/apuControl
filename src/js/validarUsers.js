const btn = document.querySelector("#btnIngresarUsuarios");
const API = "../processes/validator/validar-usuario.php";
var formulario = document.querySelector("#frmUsuarios");



btn.addEventListener("click", function (e) {


    e.preventDefault();

    const dataFormulario = new FormData(formulario);


    postData(API, dataFormulario)
        .then(response => response.json()) 
        .then(datas => {
            
            if(datas == "no existe"){
            
                alert("usuario ingresado no es valido");
            
            }else{
                
                window.location =`../views/vista-empresa.html?usuario=${datas.usuario}`;
            
            }
            
        })

})


function postData(urlAPI, data) {
    
    const response = fetch(urlAPI,
        {
            method: 'POST',
            body: data,
        }
    );

    return response;

}



