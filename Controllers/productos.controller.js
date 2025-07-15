import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../models/productos.models.js'
import { getCategoriaById } from '../models/categorias.model.js'


export const getProducts = async (req, res) => {
  try {
    const products = await obtenerProductos()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getProductById = async (req, res) => {
  try {
    const product = await obtenerProductoPorId(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'El producto no se ha encontrado' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const createProduct = async (req, res) => {
  const { nombre, precio, descripcion, disponible = true, categoriaId } = req.body

  if (!nombre || typeof precio !== 'number' || !descripcion || descripcion.length < 10) {
    return res.status(400).json({ message: 'Los datos son inválidos' })
  }

  try {
    const categoria = await getCategoriaById(categoriaId)
    if (!categoria) {
      return res.status(400).json({ message: 'La categoría no existe' })
    }

    const product = await crearProducto({ nombre, precio, descripcion, disponible, categoriaId })
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


export const updateProduct = async (req, res) => {
  const { id } = req.params
  const { nombre, precio, descripcion, disponible, categoriaId } = req.body

  if (!nombre || typeof precio !== 'number' || !descripcion || descripcion.length < 10) {
    return res.status(400).json({ message: 'Los datos son inválidos' })
  }

  try {
    const categoria = await getCategoriaById(categoriaId)
    if (!categoria) {
      return res.status(400).json({ message: 'La categoría no existe' })
    }

    const updated = await actualizarProducto(id, { nombre, precio, descripcion, disponible, categoriaId })
    if (!updated) {
      return res.status(404).json({ message: 'El producto no se ha encontrado' })
    }

    res.json({ message: 'El producto se ha actualizado correctamente' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


export const deleteProduct = async (req, res) => {
  try {
    const deleted = await eliminarProducto(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'El producto no se ha encontrado' })
    }
    res.json({ message: 'El producto se ha eliminado' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}