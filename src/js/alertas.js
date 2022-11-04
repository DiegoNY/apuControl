
export function mensajes(response, mensaje, error) {

    if (response == "ingresado") {
        Swal.fire("Registrado con exito", `${mensaje}`, "success").then(() => {
            console.log("tabla actualizada");
            mostrarLogoss();
        });

    } else {
        Swal.fire("Completa todos los campos", `${error}`, "error").then(() => {
            console.log("no hay datos");
        });

    }
}

export function eliminar(mensaje, id, tabla, url) {
    // Swal.fire({
    //     title: 'Estas Seguro ?',
    //     text: mensaje,
    //     icon: '',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Si, Eliminar ahora!'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         Swal.fire(
    //             'Borrado',
    //             '',
    //             'success'
    //         )

    //         $.post(url, { id }, function (response) {
    //             console.log(response);
    //             tabla.ajax.reload();
    //         });
    //     }
    // })

    Swal.fire({
        title: mensaje,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `no guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Eliminado', '', 'danger')
          $.post(url, { id }, function (response) {
            console.log(response);
            tabla.ajax.reload();
        });
        } else if (result.isDenied) {
          Swal.fire('No eliminaste la empresa', '', 'info')
        }
      })


}