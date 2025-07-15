import { Router } from 'express'
import * as productosController from '../Controllers/productos.controller.js'

const router = Router()

router.get('/', productosController.getProducts)
router.get('/:id', productosController.getProductById)
router.post('/', productosController.createProduct)
router.put('/:id', productosController.updateProduct)
router.delete('/:id', productosController.deleteProduct)

export default router