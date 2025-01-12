# FolklorTrack

**FolklorTrack** es una aplicación móvil desarrollada en React Native que permite la gestión integral de un club de danza folclórica. Con ella, podrás administrar eficientemente a tus alumnos, vestuario, eventos y estados, todo desde la palma de tu mano.

<p align="center">
  <img src="ruta/a/la/imagen/logo.png" alt="Logo de FolklorTrack" width="200"/>
</p>

## Funcionalidades

* **Gestión de Alumnos:**
    * Agrega nuevos alumnos con su información personal (nombre, edad, talla, género, fecha de inicio).
    * Visualiza la lista completa de alumnos.
    * Elimina alumnos de la base de datos.
* **Gestión de Vestuario:**
    * Clasifica el vestuario por estados (categorías).
    * Agrega nuevas prendas, especificando su tipo, género, talla y estado de origen.
    * Marca la disponibilidad del vestuario (disponible u ocupado).
* **Gestión de Eventos:**
    * Crea nuevos eventos con su título, detalles, fecha y lugar.
    * Consulta la lista de eventos.
    * Elimina eventos pasados o cancelados.
* **Gestión de Estados:**
    * Agrega nuevos estados a la base de datos.
    * Visualiza la lista de estados disponibles.

## Tecnologías Utilizadas

* **React Native:** Framework para el desarrollo de aplicaciones móviles nativas.
* **Firebase:** Plataforma de desarrollo de Google que proporciona:
    * **Firebase Authentication:** Para la autenticación de usuarios (inicio de sesión con correo electrónico y contraseña).
    * **Firestore:** Base de datos NoSQL para el almacenamiento de datos de la aplicación.
* **Expo:** Conjunto de herramientas que facilitan el desarrollo y la gestión de aplicaciones React Native.
* **React Navigation:** Librería para la gestión de la navegación entre pantallas.
* **Expo Image Picker:** Librería para la selección de imágenes desde la galería del dispositivo.

## Estructura del Proyecto
├── App.js

└── screens

├── DetalleAlumno.js

├── CrearEvento.js

├── Vestuario.js

├── CrearVestuario.js

├── Login.js

├── CrearEstado.js

├── Eventos.js

├── DetalleEvento.js

├── Estados.js

├── CrearAlumno.js

├── Catalogo.js

└── Alumnos.js


## Instalación

1. Clona el repositorio: `git clone https://github.com/gDavidRC28/FolklorTrack.git`
2. Instala las dependencias: `yarn install`
3. Configura tu proyecto de Firebase y actualiza el archivo `firebaseConfig.js` con tus credenciales.
4. Inicia la aplicación: `expo start`



* [Lopez Quesada Carlos Emmanuel , Ramirez Canchola  Gerardo David ](https://github.com/gDavidRC28 ,https://github.com/manyquesada )

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
