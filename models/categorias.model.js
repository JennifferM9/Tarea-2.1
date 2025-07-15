import pool from '../config/db.js'

export const getAllCategorias= async () => {
  const query = `SELECT id, nombre FROM categorias ORDER BY id`
  const [rows] = await pool.query(query)
  return rows
}

export const getCategoriaById = async (id) => {
  const query = `SELECT id, nombre FROM categorias WHERE id = ?`
  const [rows] = await pool.query(query, [id])
  return rows[0]
}


export const getCategoriaByNombre = async (nombre) => {
  const query = `SELECT id, nombre FROM categorias WHERE LOWER(nombre) = LOWER(?)`
  const [rows] = await pool.query(query, [nombre])
  return rows[0]
}


export const insertCategoria = async (nombre) => {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const insertQuery = `INSERT INTO categorias (nombre) VALUES (?)`
    const [result] = await conn.execute(insertQuery, [nombre])

    await conn.commit()
    return { id: result.insertId, nombre }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}


export const updateCategoria = async (id, nombre) => {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const updateQuery = `UPDATE categorias SET nombre = ? WHERE id = ?`
    await conn.execute(updateQuery, [nombre, id])

    await conn.commit()
    return { id, nombre }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}


export const deleteCategoria = async (id) => {
  const query = `DELETE FROM categorias WHERE id = ?`
  const [result] = await pool.query(query, [id])
  return result.affectedRows > 0
}


export const countProductosByCategoria = async (categoriaId) => {
  const query = `SELECT COUNT(*) AS total FROM productos WHERE categoria_id = ?`
  const [rows] = await pool.query(query, [categoriaId])
  return rows[0].total 
}