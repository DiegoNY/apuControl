
export function mensajes(response, mensaje, error) {

    if (response == "ingresado") {
        Swal.fire("Registrado con exito", `${mensaje}`, "success").then(() => {
            console.log("tabla actualizada");
            mostrarLogoss();
        });

    } else {
        Swal.fire("Completa todos los campos", ``, "error").then(() => {
            console.log("no hay datos");
        });

    }
}

export function eliminar(mensaje, id, tabla, url) {
   
      Swal.fire({
        title: `<img src="https://cdn-icons-png.flaticon.com/512/3900/3900103.png" width='150px' /> `,
        text: 'Estas seguro de eliminarlo?' ,
        icon: '',
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

          $.post(url, { id }, function (response) {
            console.log(response);
            tabla.ajax.reload();
        });

        }
      })
      
}

