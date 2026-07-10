import auth from '../config/firebase-admin.js'; 

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Acceso denegado: Token faltante");
    return res.status(401).json({ error: 'No autorizado: Token faltante' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Usamos el objeto 'auth' directamente, que ya es el servicio inicializado
    const decodedToken = await auth.verifyIdToken(token);
    
    req.user = decodedToken; 
    next();
  } catch (error) {
    console.error('Error al validar token:', error.message);
    return res.status(403).json({ error: 'Token inválido' });
  }
};