import express from "express"
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } from "../controllers/movie.controllers.js"


const router = express.Router()

router.post ("/movies", createMovie ) 
router.get ("/movies", getMovies )
router.get ("/movies/:id", getMovieById)
router.delete("/movies/:id", deleteMovie)
router.put ("/movies/:id", updateMovie)

export default router;