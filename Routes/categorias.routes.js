import { Router } from 'express'
import {
  Todos,
  getCategoriaById,
  insertarCategoria,
  Categoria,
  eliminarCategoria,
  
} from '../Controllers/categorias.controller.js'


const router = Router()

router.get('/', Todos)
router.get('/:id', getCategoriaById)
router.post('/', insertarCategoria)
router.put('/:id', Categoria)
router.delete('/:id', eliminarCategoria)

export default router