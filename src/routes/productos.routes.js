import { Router } from 'express';

// IMPORTANTE: Importa las funciones desde el CONTROLLER, no desde el model
import { getAllProductsController, getProductByIdController ,crearProductoController,borrarProductoController} from '../controllers/productos.controller.js';

const router = Router();


router.use((req, res, next) => {
    console.log("Petición recibida en productos:", req.method, req.originalUrl);
    next();
});





router.get('/', getAllProductsController); // Usamos la función del controlador


router.get('/:id', getProductByIdController); // Usamos la función del controlador para obtener un producto por ID



router.post('/crear', crearProductoController);

router.delete('/:id', borrarProductoController);

export default router;