import pool from '../db/pool.js';

// POST /api/clientes
// Campos: nombre, telefono, email
export async function createCliente(req, res) {
  const { nombre, telefono, email } = req.body;

  if (!nombre || !telefono || !email) {
    return res.status(400).json({
      error: 'Los campos nombre, telefono y email son obligatorios.'
    });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO clientes (nombre, telefono, correo) VALUES (?, ?, ?)',
      [nombre, telefono, email]
    );

    return res.status(201).json({
      message: 'Cliente creado exitosamente.',
      cliente: {
        id: result.insertId,
        nombre,
        telefono,
        email
      }
    });
  } catch (err) {
    console.error('[createCliente] Error:', err.message);
    return res.status(500).json({
      error: 'Error interno al crear el cliente.',
      detail: err.message
    });
  }
}

// POST /api/mascotas
// Campos: nombre, especie, cliente_id (FK)
export async function createMascota(req, res) {
  const { nombre, especie, cliente_id } = req.body;

  if (!nombre || !especie || !cliente_id) {
    return res.status(400).json({
      error: 'Los campos nombre, especie y cliente_id son obligatorios.'
    });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO mascotas (nombre, especie, cliente_id) VALUES (?, ?, ?)',
      [nombre, especie, cliente_id]
    );

    return res.status(201).json({
      message: 'Mascota creada exitosamente.',
      mascota: {
        id: result.insertId,
        nombre,
        especie,
        cliente_id
      }
    });
  } catch (err) {
    console.error('[createMascota] Error:', err.message);
    return res.status(500).json({
      error: 'Error interno al crear la mascota.',
      detail: err.message
    });
  }
}
