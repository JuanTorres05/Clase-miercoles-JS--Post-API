import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import clientesRoutes from '../modules/clientes/clientes.routes.js';
import vetRoutes from './vet.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/clientes', clientesRoutes);

// Rutas directas para el ejercicio (sin autenticación)
router.use('/', vetRoutes);

export default router;
