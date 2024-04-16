require('dotenv').config();

const app = require('./server');
const connectToDatabase = require('./database')

// Conectarse a la base de datos
connectToDatabase()
    .then(({ client, db }) => {
        console.log('Conexión a la base de datos establecida correctamente');

        // Definir la variable global para la base de datos
        global.db = db;

        // Iniciar el servidor
        app.listen(app.get('port'), () => {
            console.log(`Servidor en funcionamiento en el puerto ${app.get('port')}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    });
