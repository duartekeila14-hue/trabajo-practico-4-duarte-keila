import express from "express"
import router from "./src/routes/movie.routes.js"
import { startDb } from "./src/config/database.js" 

const app = express()

const port = 3000

app.use(express.json())
app.use ("/api", router)

const startServer = async () => {
    try {
        await startDb();

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`)
        })
    } catch (error) {
        process.exit(1)
    }
}

startServer()