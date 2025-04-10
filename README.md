# FolklorTrack

**FolklorTrack** es una aplicación móvil desarrollada en React Native que permite la gestión integral de un club de danza folclórica. Con ella, podrás administrar eficientemente a tus alumnos, vestuario, eventos y estados, todo desde la palma de tu mano  .

<p align="center">
  <img src="/assets/Bailarines.jpg" alt="Logo de FolklorTrack" width="200"/>
</p>

Correo para pruebas: 
  testeo@gmail.com
Contraseña:
  test1234
  
## Funcionalidades

* **Gestión de Usuarios:**
    * Agrega nuevos miembros con su información personal (nombre, edad, talla, género, fecha de inicio).
    * Modifica la informacion de los miembros.
    * Visualiza la lista completa de alumnos.
    * Elimina alumnos de la base de datos.
* **Gestión de Vestuario:**
    * Clasifica el vestuario por estados (categorías).
    * Agrega nuevas prendas, especificando su tipo, género, talla y estado de origen.
    * Marca la disponibilidad del vestuario (disponible u ocupado).
    * Modificacion de las prendas.
* **Gestión de Eventos:**
    * Crea nuevos eventos con su título, detalles, fecha y lugar.
    * Consulta la lista de eventos.
    * Elimina eventos pasados o cancelados.
* **Gestión de Estados:**
    * Agrega nuevos estados a la base de datos.
    * Visualiza la lista de estados disponibles.
    * Modificacion de los Eventos.

## Tecnologías Utilizadas

* **React Native:** Framework para el desarrollo de aplicaciones móviles nativas.
* **Firebase:** Plataforma de desarrollo de Google que proporciona:
    * **Firebase Authentication:** Para la autenticación de usuarios (inicio de sesión con correo electrónico y contraseña).
    * **Firestore:** Base de datos NoSQL para el almacenamiento de datos de la aplicación.
* **Expo:** Conjunto de herramientas que facilitan el desarrollo y la gestión de aplicaciones React Native.
* **React Navigation:** Librería para la gestión de la navegación entre pantallas.
* **Expo Image Picker:** Librería para la selección de imágenes desde la galería del dispositivo.

## Estructura del Proyecto
├── App.js<br>
├── App.json<br>
├── README.md<br>
├── firebaseConfig.js<br>
├── index.js<br>
├── package-lock.json<br>
├── package.json<br>
├── yarn.lock<br>
├── .gitattributes<br>
├── .gitignore<br>
├── assets/<br>
│   └── ... <br>
├── models/<br>
│   ├── ModeloAlumno.js<br>
│   ├── ModeloCategoria.js<br>
│   ├── ModeloCrearAlumno.js<br>
│   ├── ModeloCrearCategoria.js<br>
│   ├── ModeloCrearEvento.js<br>
│   ├── ModeloCrearVestuario.js<br>
│   ├── ModeloDetalleAlumno.js<br>
│   ├── ModeloDetalleEvento.js<br>
│   ├── ModeloEvento.js<br>
│   └── ModeloVestuario.js<br>
├── navigation/<br>
│   └── AppNavigator.js<br>
├── node_modules/<br>
│   └── ... <br>
├── services/<br>
│   ├── ServicioCrearEvento.js<br>
│   ├── ServicioAlumno.js<br>
│   ├── ServicioAutenticacion.js<br>
│   ├── ServicioCategoria.js<br>
│   ├── ServicioCrearAlumno.js<br>
│   ├── ServicioCrearCategoria.js<br>
│   ├── ServicioCrearVestuario.js<br>
│   ├── ServicioDetalleAlumno.js<br>
│   ├── ServicioDetalleEvento.js<br>
│   ├── ServicioEventos.js<br>
│   └── ServicioVestuario.js<br>
└── viewmodels/<br>
├── Autenticacion.js<br>
├── funcionesAlumnos.js<br>
├── funcionesApp.js<br>
├── funcionesCategorias.js<br>
├── funcionesCrearAlumno.js<br>
├── funcionesCrearCategoria.js<br>
├── funcionesCrearEvento.js<br>
├── funcionesCrearVestuario.js<br>
├── funcionesDetalleAlumno.js<br>
├── funcionesDetalleEvento.js<br>
├── funcionesEventos.js<br>
├── funcionesLogin.js<br>
└── funcionesVestuario.js




## Instalación

1. Clona el repositorio: `git clone https://github.com/gDavidRC28/FolklorTrack.git`
2. Instala las dependencias: `yarn install`
3. Configura tu proyecto de Firebase y actualiza el archivo `firebaseConfig.js` con tus credenciales.
4. Inicia la aplicación: `yarn start`



* [Lopez Quesada Carlos Emmanuel , Ramirez Canchola  Gerardo David ](https://github.com/gDavidRC28 ,https://github.com/manyquesada )

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
