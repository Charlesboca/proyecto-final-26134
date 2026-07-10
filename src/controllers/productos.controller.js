import { db } from '../config/firebase.js';
import { getProducts, getProductById ,crearProducto,borrarProducto } from '../models/productos.models.js';
// uno por cada metodo que tenga el controlador para que no se rompa la app

// Ver donde me falla la importación
console.log("Lo que estoy importando es:", getProducts);
console.log("Lo que estoy importando es:", getProductById);
console.log("Lo que estoy importando es:", crearProducto);
console.log("Lo que estoy importando es:", borrarProducto);


export const getAllProductsController = async (req, res) => {
    try {
        const productos = await getProducts(); // Aquí llamamos a la base de datos ojo el nombre 
        // Respondemos con los datos en formato JSON asi entiende como deber mostrarse 
        res.json(productos);

    } catch (error) {
         console.error(error); // Agregamos un log para ver el error en la consola
          res.status(500).json({ error: "Error interno del servidor" });// Cambiamos el mensaje de error para que sea más genérico y no revele detalles internos
    }
};


export const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params; // El ":id" de la ruta que es el "where" 
        // le pongo async  para que no se bloquee y siga el resto corriendo 
        
          const producto = await getProductById(id);
        
        if (!producto) {
            // el famoso pagenotfound que es el 404 
             return res.status(404).json({ error: "Producto no encontrado" });
        }
        // si salio todo bien damos el clasico 200 
        res.status(200).json(producto);
 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};


export const crearProductoController = async (req, res) => {
    try {
        console.log("Datos recibidos en el body:", req.body); // Log para ver qué datos estamos recibiendo en el body de la petición
        const productData = req.body;
        
        if (!productData.nombre || !productData.precio) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const newProduct = await crearProducto(productData);
        // devolvemos  201 (Created) tras el éxito
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const borrarProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarProducto(id);
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ error: "No se pudo eliminar el producto" });
    }
};