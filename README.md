# React + GraphQL + ApolloClient

El proposito de este taller es entender las bases de la comunicacion entre una API construida con GraphQL y construir una aplicacion sencilla para el enlistado de tareas.

## Pre-requisitos

Deben instalar en su sistema las siguientes herramientas:

- Node.js
- Entremos y creemonos una cuenta en [mLab](https://mlab.com/) para conectar nuestro servidor de graphQL

## Que vamos a hacer

Vamos a construir una aplicacion que nos ayude a enlistar tareas y trabajaremos sobre las 4 operaciones basicas:

- Enlistar todas las tareas
- Crear una tarea
- Editar una tarea
- Eliminar una tarea

### Extras

El servidor ya cuenta con algunas reglas de autenticacion usando JWT.

Pueden completar el login y hacer fetch de solo las tareas que pertenencen al usuario en Sesion.

Todo esto utilizando `ApolloClient` la cual es una libreria que nos otorga las conexiones perfectas con nuestras consultas en GraphQL

Por ultimo haremos deploy de nuestra plataforma usando Now.sh
