import { db } from '../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Definimos un array de productos de ejemplo para poblar la base de datos
/// para que ande bien la coleccion debe existir en firebase y tener el mismo nombre que
// le pongo aca despues  si se puede borrar ese 
// dato de mentira que pusea para poblar la base de datos y que no rompa la app
const productosSeeders = [
    {  nombre: "Pelota", precio: 100, stock: 10, descripcion: "Pelota numero 5 ",fechaCreacion: new Date().toISOString() },
    {  nombre: "Botin", precio: 250, stock: 5, descripcion: "Botin de papi",fechaCreacion: new Date().toISOString() },
    {  nombre: "Medias", precio: 50, stock: 20, descripcion: "Medias que no cortan la piel",fechaCreacion: new Date().toISOString() }
]; 
// Armamos la función para poblar la base de datos con los productos de ejemplo con seeders para hacerlo más rápido y fácil
export const seedProductos = async () => {
    try {
        // Definimos la colección de productos
        const productosCollection = collection(db, 'productos');1
        // Iteramos sobre el array de productos y los agregamos a la colección
          for (const producto of productosSeeders) {
            // tener cuidado con el tema del nombre 
               await addDoc(productosCollection, producto);
        }
        
        console.log("¡Base de datos poblada con éxito!");
    } catch (error) {
        console.error("Error al poblar la base de datos:", error);
    }
};