const { Router } = require('express');
const router = Router();
const { ObjectId } = require('mongodb');
const { generateToken, verifyToken } = require('./auth');

// Define una ruta para la raíz de la API
router.get('/', async (req, res) => {
    try {
        const tokenGenerated = generateToken(req.body.user);

        if (!tokenGenerated) {
            return res.status(404).json({ mensaje: 'Error al obtener token de acceso' });
        }
        
        res.status(200).json({ token: tokenGenerated });
    } catch (error) {
        console.error('Error al buscar la cuenta en la base de datos:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// Ruta para obtener detalles de una cuenta fiduciaria por ID
router.get('/accounts/:id_account', verifyToken, async (req, res) => {
    const { id_account } = req.params;

    try {
        // Buscar la cuenta en la base de datos por su ID
        const account = await db.collection('accounts').findOne({ _id: new ObjectId(id_account) });

        // Verificar si se encontró la cuenta
        if (!account) {
            return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
        }

        // Si se encontró la cuenta, devolver los detalles
        res.status(200).json(account);
    } catch (error) {
        console.error('Error al buscar la cuenta en la base de datos:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// Ruta para obtener todas las cuentas de un cliente por su ID
router.get('/clients/:id_client/accounts', verifyToken, async (req, res) => {
    const { id_client } = req.params;

    try {
        // Buscar todas las cuentas del cliente en la base de datos
        const accounts = await db.collection('accounts').find({ id_cliente: id_client }).toArray();

        // Verificar si se encontraron cuentas para el cliente
        if (accounts.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron cuentas para el cliente' });
        }

        // Devolver las cuentas encontradas
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error al buscar las cuentas del cliente en la base de datos:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

module.exports = router;
