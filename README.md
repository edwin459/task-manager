# TaskManagerApp


📌 README para el Proyecto Angular (frontend/README.md)

Task Manager App - Frontend  
Este proyecto es el frontend de una aplicación de gestión de tareas desarrollada con *Angular 19. Se encarga de la interacción con el usuario y la comunicación con el backend en *.NET Core**.  

🚀 Tecnologías Utilizadas  
- *Framework:* Angular 19  
- *Estilos:* Bootstrap 
- *Gestión de Formularios:* Reactive Forms  
- *Rutas y Navegación:* Angular Router  
- *Manejo de Datos:* RxJS y HttpClient  
- *Herramientas:* Node.js, Angular CLI, Visual Studio Code  

📌 Características  
✔ Interfaz intuitiva y responsive  
✔ CRUD de tareas con validaciones  
✔ Conexión con API REST en .NET Core  
✔ Uso de RxJS para manejar peticiones asíncronas  

🔧 Instalación y Configuración  

1️⃣ Requisitos Previos*  
- Node.js 18+  
- Angular CLI 16+  

2️⃣ Instalación*  
bash
git clone https://github.com/tu-usuario/task-manager-app.git
cd task-manager-app/frontend
npm install

3️⃣ Ejecutar el Proyecto

ng serve

Abrir en el navegador: http://localhost:4200

📌 Estructura del Proyecto

frontend/
│── src/
│   ├── app/               # Componentes principales
│   │   ├── components/    # Componentes reutilizables
│   │   ├── services/      # Servicios para conectar con la API
│   │   ├── models/        # Interfaces de datos
│   │   ├── app.module.ts  # Módulo principal
│   ├── assets/            # Recursos estáticos
│── angular.json           # Configuración de Angular
│── package.json           # Dependencias y scripts

📌 API de Tareas

Obtener tareas: GET /tasks

Crear tarea: POST /tasks

Actualizar tarea: PUT /tasks/{id}

Eliminar tarea: DELETE /tasks/{id}



