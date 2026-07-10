import { seedProductos } from './src/seeders/productos.seeder.js';

// Esto ejecuta el seeder y luego cierra el proceso
seedProductos().then(() => process.exit());