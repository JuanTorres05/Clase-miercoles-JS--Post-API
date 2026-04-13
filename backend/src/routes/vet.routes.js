import { Router } from 'express';
import { createCliente, createMascota } from '../controllers/vet.controller.js';

const router = Router();

// POST /api/clientes  → Crea un cliente (nombre, telefono, email)
router.post('/clientes', createCliente);

// POST /api/mascotas  → Crea una mascota (nombre, especie, cliente_id)
router.post('/mascotas', createMascota);

export default router;
