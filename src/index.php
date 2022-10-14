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
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">

    
</head>

<body>
    <header>

    </header>
    <main>
       
        <div class="">
           
        </div>

        <div class="formulario-registro-grupos">
            <form id="frm_grupo" name="frm_grupo" >
                <div>
                    <label for="txtNombre">Nombre Grupo :</label>
                    <input type="hidden" name="txtFuncion" id="txtFuncion" value="Insertar" >
                    <input type="text" name="txtNombre" id="txtNombre">
                </div>
                <div>
                    <label for="txtDescripcion">Descripcion :</label>
                    <input type="text" name="txtDescripcion" id="txtDescripcion">
                </div>
                <div>
                    <input type="hidden" value="1" name="txtEstado" id="txtEstado">
                </div>
                <div>
                    <label for="txtUsuCre">Usuario Creacion :</label>
                    <input type="text" name="txtUsuCre" id="txtUsuCre">
                </div>
                <div>
                    <label for="txtFechCre">Fecha Creacion :</label>
                    <input type="text" name="txtFechCre" id="txtFechCre">
                </div>
                <input type="button" onclick="RegistrarGrupo()" value="ingresar Grupo">
            </form>

           
            <div class="tabla-grupo">
                <div class="tablas-empresa table-responsive">
                    <table id="grupo" class="table table-bordered border table-hover" style="width:100%">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>R.Social</th>
                                <th>Contactos</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Data en Ajax-->
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </main>
</body>

</html>
<script  type="text/javascript" src="js/main.js"></script>