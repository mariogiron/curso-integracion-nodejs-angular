## Recuperar todos los tickets

Method: GET
Url: /api/tickets

Response: Un array con todos los tickets

## Recuperar un ticket a través de su ID

Method: GET
Url: /api/tickets/TICKETID

Response: Un único objeto con los datos del ticket


## Crear en el listado dos botones tickets asignados - tickets sin asignar (rutas hijas)  ✅
## En el formulario de edición crear un campo asignar a - select que me permita asignar a un usuario. ✅
## Proceso de registro ✅
        - Front creamos un formulario para registrar usuarios ✅
        - Back Ruta, controlador, y modelo para insertar usuarios (encriptar bcrypt la contraseña que usuario introduzca en el formulario) ✅
## Colocarle tanto front como al back, un proceso de login ✅
            - BACK - login para comprobar que el usuario existe ✅
            - FRONT - formulario login ✅
## Proteger las paginas del front para que no se puedan acceder sin estar logados
            - GUARDS - Angular ✅
## Back devuelva un token que valide mi login para mantener el estado de la aplicacion. ✅
## Inteceptor para validar las peticiones a api ✅

## trabajo con roles / admin, user, editor
   - admin => pueda hacer cualquier cosas dentro del aplicacion
   - editor => solo pueder ver tickets
   - user => solo puede crear tickets 