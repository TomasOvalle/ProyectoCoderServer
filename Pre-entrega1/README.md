# Pre-Entrega1BackEnd

Pre-Entrega 1

Servidor con Express, Nodemon y Morgan

Este proyecto implementa un servidor utilizando Express.js junto con Nodemon y Morgan como herramientas complementarias. El servidor maneja tanto productos como usuarios, almacenando los datos tanto en objetos JSON como en la memoria del servidor.

Funcionalidades

Middleware

El servidor implementa middlewares como Morgan para el registro de solicitudes HTTP y Nodemon para el reinicio automático del servidor en caso de cambios en los archivos.

Configuración de Rutas

Las rutas están configuradas para manejar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) tanto para productos como para usuarios.

Manejo de Errores

Se han implementado métodos para manejar errores, como el caso en el que no se encuentran datos.

Manejo de Rutas No Existentes

También se han configurado rutas para manejar solicitudes a rutas que no existen en el servidor.

Prueba en Postman

Puedes probar todas las funcionalidades del servidor utilizando Postman. A continuación, se detallan las rutas y métodos disponibles:

Creación de datos: POST /productos y POST /usuarios

Actualización de datos: PUT /productos/:id y PUT /usuarios/:id

Eliminación de datos: DELETE /productos/:id y DELETE /usuarios/:id

Lectura de todos los datos: GET /productos y GET /usuarios

Lectura de un solo dato: GET /productos/:id y GET /usuarios/:id