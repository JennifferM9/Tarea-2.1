import express from 'express'
import productosRouter from './Routes/productos.routes.js'
import categoriasRouter from './Routes/categorias.routes.js'
import cors from 'cors'

const app= express()
app.use (cors())
app.use(express.json())
app.use('/productos', productosRouter)
app.use('/categorias', categoriasRouter)

const PORT= process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})