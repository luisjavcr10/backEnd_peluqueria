require('./models'); // soluciono el problema con las relaciones ventas y detalles, carga los modelos e index.js antes de todos los modelos.
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

dotenv.config();

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Conexion a la base de datos
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir si hay un error
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//Llamamos las rutas
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



