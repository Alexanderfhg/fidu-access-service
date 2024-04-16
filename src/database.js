const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URL;
const dbName = process.env.DATABASE_NAME;

// Función para conectarse a la base de datos
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    
    return { client, db };
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
