import { db } from '../config/firebase.js';
// Importamos las funciones necesarias de Firebase
import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc 
} from "firebase/firestore";

// Definimos la colección de productos
const productsCollection = collection(db, 'productos'); 

export const getProducts = async () => { //respetar el nombre  que puse antes 
    // Obtenemos todos los documentos de la colección que traigo de firebase  
    const snapshot = await getDocs(productsCollection);
    
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// buscando por id el producto parecido a hibernate de Java , pero en este caso es asincrono y no se bloquea el resto del codigo
export const getProductById = async (id) => {
    // Apuntamos al documento específico dentro de la colección 'productos' en lugar de where es mejor usa esto 
    /// aca esta el "where"
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null; // Si no existe el documento, devolvemos null para que rompa  
    }
};


export const crearProducto = async (productData) => {
    // addDoc inserta el documento a la colección definida
    const docRef = await addDoc(productsCollection, productData);
    // devolvemos el objeto con el ID recién creado
    return { id: docRef.id, ...productData };
};


export const borrarProducto = async (id) => {
    const docRef = doc(db, 'productos', id);
    // verificamos si el documento existe antes de intentar borrarlo
    await deleteDoc(docRef);
    return { message: "Producto eliminado correctamente" };
};