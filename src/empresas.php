<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!--DataTable-->
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

    <!-- Stylos -->
    <link rel="stylesheet" href="style/style.css">
    <!---TABS LINKS -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!-- TABS -->
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <!-- fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap" rel="stylesheet">

    <!-- <link rel="stylesheet" href="style/style.css"> -->
</head>

<body>
    <div class="tabla-empresas inactive">
        <div class="tablas-empresa table-responsive container-fluid">
            <table id="tabla_empresasas" class="table  table-borderless table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Ruc</th>
                        <th scope="col">Social</th>
                        <th scope="col">Ubigeo</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Rubro</th>
                        <th scope="col">T.Envio</th>
                        <th scope="col">Tipo Integracion</th>
                        <th scope="col">Fecha de registro</th>
                        <th scope="col">Estado comercial</th>
                        <th scope="col">Tipo de persona</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody id="listado-empresas">
                </tbody>
            </table>
        </div>
    </div>

    <input type="hidden" name="btn_registrar" value="Registrar Logo" class="btn-registrar-logo" id="btn_registrar">
    
    <script type="text/javascript" src="js/main.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
</body>

</html>