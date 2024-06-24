# REGISTRO DE USUARIOS

![Texto Alternativo](https://i.ibb.co/NCXjktp/proyecto-1.png)


## Pasos para la creación del Proyecto con Vite:

1. Verificar la version de nodejs a usar.

    ```
    node -v
    ```

2. Crear el proyecto con Vite:

    ```
    npm create vite@latest
    ```

    Opciones: 

    - Project name: `vite-project`
    - Select a framework: `Vanilla`
    - Select a variant: `JavaScript`

3. Abrir la carpeta con Visual Studio

5. Instalación de Dependencias desde el terminal de Visual Studio:

    ```
    npm install axios -D
    npm install json-server
    ```

6. crear el archivo db.json y crear el contenido: 

    ```
    {
    "users": [
        {
        "id": "ff2e",
        "name": "Felipe",
        "lastname": "Suarez",
        "country": "Perú"
        }
    ]
    }
    ```

7. Iniciar JSON server.

    ```
    npx json-server db.json
    ```

8. Iniciar Vite para el desarrollo.

    ```
    npm  run dev
    ```

## Funcionalidades del proyecto :

1. **`Mostrar Usuarios:`** Al cargar la página, se solicita y muestra la lista actual de usuarios desde http://localhost:3000/users.

2. **`Agregar Usuario:`** Mediante un formulario HTML, se pueden agregar nuevos usuarios ingresando su nombre, apellido y país.

3. **`Eliminar Usuario:`**  Cada usuario en la lista tiene un botón "Eliminar" que, al hacer clic, elimina el usuario correspondiente de la lista y de la base de datos simulada.

4. **`Mostrar Bandera del País:`** Para cada usuario mostrado en la tabla, se obtiene dinámicamente la bandera del país utilizando la API de REST Countries.

## Tecnologías Utilizadas

1. **`Axios:`** Librería para realizar solicitudes HTTP desde el cliente hacia el servidor.

2. **`JSON Server:`** Herramienta para simular una API REST utilizando un archivo JSON como base de datos.



## Funciones de JavaScript usados en main.js

1. `readUsers():` Lee y muestra los usuarios desde la API utilizando Axios.
2. `createRow(user, index):` Crea una fila en la tabla para cada usuario.
3. `deleteButtonClickHandler(event):` Maneja el evento de clic en el botón "Eliminar" para eliminar usuarios.
4. `renumberRows():` Renueva los números de las filas después de eliminar un usuario.
5. `addUsers(user):` Agrega un nuevo usuario a la tabla y a la API.
6. `obtenerCodigoPais(nombrePais):` Obtiene el código ISO-3166-1 alpha-2 del país utilizando REST Countries API.
7. `traducirANombreIngles(nombrePais):` Traduce el nombre del país al inglés utilizando la API de traducción mymemory.translated.net.

## RESULTADO DE PROYECTO


![Demo](https://i.ibb.co/Bqhxvx7/register-user.gif)
