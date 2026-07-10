import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

// IMPORTANTE: Importa las funciones desde el CONTROLLER, no desde el model
import { getAllProductsController, getProductByIdController ,crearProductoController,borrarProductoController} from '../controllers/productos.controller.js';

const router = Router();



/// Prueba temporal de middleware para loguear las peticiones a la ruta de productos

router.get('/prueba-auth', verifyToken, (req, res) => {
    res.json({ 
        mensaje: "¡El token es válido!", 
        usuario: req.user 
    });
});


router.use((req, res, next) => {
    console.log("Petición recibida en productos:", req.method, req.originalUrl);
    next();
});


router.use(verifyToken);


////router.get('/', getAllProductsController); // Usamos la función del controlador sin token
router.get('/', verifyToken, getAllProductsController); // Usamos la función del controlador con token


router.get('/:id', getProductByIdController); // Usamos la función del controlador para obtener un producto por ID



router.post('/crear', crearProductoController);


router.delete('/:id', borrarProductoController);

export default router;