import pool from '../config/db.js'

export const obtenerProductos = async ()=>{
    const query=`SELECT p.id, p.nombre, p.precio, p.descripcion, p.disponible, p.fecha_ingreso, 
           p.categoria_id AS categoriaId, c.nombre AS categoria FROM productos p 
           JOIN categorias c ON p.categoria_id = c.id`
        const [rows]= await pool.query(query)
        return rows
}

export const obtenerProductoPorId = async (id) => {
  const query = `SELECT p.id, p.nombre, p.precio, p.descripcion, p.disponible, p.fecha_ingreso, 
           p.categoria_id AS categoriaId, c.nombre AS categoria FROM productos p
           JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?`
  const [rows] = await pool.query(query, [id])
  return rows[0]
}

export const crearProducto = async (producto) => {
  const conn = await pool.getConnection()
  try {
    const { nombre, precio, descripcion, disponible, categoriaId } = producto
    await conn.beginTransaction()

    const [catRows] = await conn.query('SELECT id FROM categorias WHERE id = ?', [categoriaId])
    if (catRows.length === 0) {
      throw new Error('La categoría ingresada no existe')
    }

    const query = `INSERT INTO productos (nombre, precio, descripcion, disponible, categoria_id) VALUES (?, ?, ?, ?, ?)`
    const [result] = await conn.query(query, [nombre, precio, descripcion, disponible, categoriaId])

    await conn.commit()
    return { id: result.insertId, ...producto }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export const actualizarProducto = async (id, data) => {
  const { nombre, precio, descripcion, disponible, categoriaId } = data
  const query = `UPDATE productos 
                 SET nombre = ?, precio = ?, descripcion = ?, disponible = ?, categoria_id = ?
                 WHERE id = ?`
  const [result] = await pool.query(query, [nombre, precio, descripcion, disponible, categoriaId, id])
  return result.affectedRows
}

export const eliminarProducto = async (id) => {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id])
  return result.affectedRows
}