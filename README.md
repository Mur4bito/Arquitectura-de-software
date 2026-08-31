# Arquitectura-de-software
Aquí esta el proyecto de arquitectura de software que se ira actualizando conforme avancemos el curso.

Hasta ahora la primera parte:
API de Productos

# Requisitos previos:
Node.js instalado (v18 o superior recomendado)
Una base de datos en MongoDB Atlas, lo hice con mi propio clúster, espero que funcione en caso de que quiera activarlo, o también me dice para conectar el clúster y lo pueda probar.

# Instalación

Instala las dependencias del proyecto con:

# npm install

# Configuración

Crea un archivo .env en la raíz del proyecto con las siguientes variables (el cual no esta en el proyecto porque puse un .Gitignore):

MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/productos-api
PORT=3000

Reemplaza <usuario>, <password> y <cluster> por los datos de tu conexión de MongoDB Atlas. Si usas MongoDB local en vez de Atlas, la URI sería algo como mongodb://localhost:27017/productos-api.

# Cómo levantar el proyecto
en la terminal debes de poner:
node server.js

Si todo está bien configurado, en la consola vas a ver:

Conectado a MongoDB
La api esta corriendo en el puerto 3000


# Estructura en la cual tengo el proyecto ahora mismo
├── config/
│   └── db.js          # Conexión a MongoDB con Mongoose
├── models/
│   └── Product.js      # Esquema de Mongoose para productos
├── server.js            # Servidor Express y rutas
├── .env                 # Variables de entorno (no se sube al repo)
└── package.json

# Modelo de producto

Cada producto tiene:

Campo	Tipo	Validación
name	string	obligatorio, mínimo 3 caracteres
price	number	obligatorio, debe ser positivo
stock	number	obligatorio, entero, mínimo 0

Si el body enviado no cumple estas reglas, la API responde 400 con el detalle del error de validación.

# Endpoints
Método	Ruta	Descripción
POST	/products	Crea un producto nuevo
GET	/products	Lista todos los productos
GET	/products/:id	Obtiene un producto por su ID
PUT	/products/:id	Actualiza uno o más campos de un producto
DELETE	/products/:id	Elimina un producto

# Por ultimo los ejemplos con curl:

# Crear un producto

curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Teclado mecánico", "price": 45.99, "stock": 10}'

# Listar todos los productos

curl http://localhost:3000/products

# Obtener un producto por ID

curl http://localhost:3000/products/<ID>

# Actualizar un producto

curl -X PUT http://localhost:3000/products/<ID> \
  -H "Content-Type: application/json" \
  -d '{"stock": 5}'

# Eliminar un producto

curl -X DELETE http://localhost:3000/products/<ID>

Reemplaza <ID> por el _id real de un producto, que te devuelve el POST o el GET a /products.
(Generalmente suelo ver el ID del producto en postman o en MongoDB).
