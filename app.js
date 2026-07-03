import express from "express"
import router from "./src/routes/movie.routes.js"
import { startDb, sequelize } from "./src/config/database.js" 
import "./src/models/movie.model.js"

const app = express()

const port = 3000

app.use(express.json())
app.use ("/api", router)

const startServer = async () => {
    try {
        await startDb();
        await sequelize.sync();

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`)
        })
    } catch (error) {
        process.exit(1)
    }
}

startServer()