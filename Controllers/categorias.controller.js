import {
  getAllCategorias,
  getCategoriaById as getCategoriaByIdM,
  getCategoriaByNombre,
  insertCategoria,
  updateCategoria,
  deleteCategoria,
  countProductosByCategoria, 
} from '../models/categorias.model.js'

export const Todos = async (req, res) => {
  try {
    const categorias = await getAllCategorias()
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error })
  }
}

export const getCategoriaById = async (req, res) => {
  const { id } = req.params

  try {
    const categoria = await getCategoriaByIdM(id)

    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    res.json(categoria)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoría', error })
  }
}

export const insertarCategoria = async (req, res) => {
  const { nombre } = req.body

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' })
  }

  try {
    const existente = await getCategoriaByNombre(nombre)

    if (existente) {
      return res.status(409).json({ message: 'El nombre de la categoría ya existe' })
    }

    const nueva = await insertCategoria(nombre)

    res.status(201).json(nueva)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error })
  }
}

export const Categoria = async (req, res) => {
  const { id } = req.params
  const { nombre } = req.body

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' })
  }

  try {
    const existente = await getCategoriaById(id)

    if (!existente) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    const duplicada = await getCategoriaByNombre(nombre)
    if (duplicada && duplicada.id != id) {
      return res.status(409).json({ message: 'El nombre ya está en uso por otra categoría' })
    }

    const actualizada = await updateCategoria(id, nombre)

    res.json(actualizada)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría', error })
  }
}

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params

  try {
    const productos = await countProductosByCategoria(id)

console.log('Productos asociados:', productos)

    if (productos > 0) {
    return res.status(400).json({ message: 'No se puede eliminar una categoría con productos asignados' })
    }

    const eliminado = await deleteCategoria(id)

    if (!eliminado) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    res.json({ message: 'Categoría eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error })
  }
}
