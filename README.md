### Luis Carrion - Vicente Valdivieso

# clase07-2bim

### Proyecto Django

* Instalarla librería django-cors-headers
* Crear un super usuario


### Proyecto VueJs

* Ingresar a la carpeta mi-app-vue
* Ejecutar npm install (esperar algunos minutos)
* Ejecutar npm run serve

### Probar funcionamiento

* Ingresar a un navegador y revisar si el funcionamiento de la aplicación den VueJs

### Tareas - reto

* Implementación de Funcionalidades de Edición y Eliminación en Vue.js
  * Para Estudiantes
  * Para Teléfonos

### Recomendación

 * Tomar un tiempo produnte para analizar el código ya generado en VueJs

### Prompts
 
Prompt 1: ¿Cómo hago una petición POST desde Vue para enviar datos al backend Django y crear un nuevo teléfono?

Prompt 2: ¿Qué métodos principales necesito en Vue.js para conectar con una API que me devuelve teléfonos?

Prompt 3: ¿Qué función debería usar en Vue.js para enviar datos al backend mediante una API REST? ¿Cuál es la diferencia entre axios y fetch?

Prompt 4: Explícame cómo conectar un formulario de Vue.js con mi API Django para registrar datos de teléfonos.

Prompt 5: En esta ruta:

{
    path: "/telefonos/nuevo/:estudianteId",
    name: "CrearTelefono",
    component: CrearTelefono, 
    props: true,
    meta: { requiresAuth: true },
}

¿Qué relevancia tiene el atributo props en la definición de una nueva ruta?
