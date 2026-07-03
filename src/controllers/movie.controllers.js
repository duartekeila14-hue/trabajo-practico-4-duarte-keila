import { Movie } from "../models/movie.model.js"

export const createMovie = async (req,res) => {
    // title: string obligatorio
    // genre: string obligatorio
    // duration: integer (minutos) obligatorio
    // year: integer (4 dígitos, mayor o igual a 1888 y menor o igual al año actual) obligatorio
    // synopsis: string opcional
    try{
        const { title, genre, duration, year, synopsis } = req.body
        if (!title || !genre || !duration || !year) {
            return res.status(400).json({message: "Faltan campos obligatorios"})
        }
        if (year < 1888 || year > new Date().getFullYear()){
            return res.status(400).json({message: "El año debe ser mayor o igual a 1888 y menor o igual al año actual."})
        }

        const newMovie = await Movie.create({ title, genre, duration, year, synopsis})
        return res.status(201).json({message: "Película creada correctamente.", movie: newMovie})
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor."}) 
    }
}

export const getMovies = async (req,res) => {
    try{
        const allMovies = await Movie.findAll()
        if (allMovies.length === 0){
            return res.status(404).json({message: "No se encontraron películas. Agrega una para poder ver la lista."})
        }
        return res.status(200).json({message: "Películas obtenidas: ", movies: allMovies})
    }catch (error) {
        return res.status(500).json({message: "Error interno del servidor.", error: error.message})
    }
}

export const getMovieById = async (req,res) => {
    try{
        const { id } = req.params
        const findMovie = await Movie.findByPk(id)
        if (!findMovie) {
            return res.status(404).json({message: "Película no encontrada."})
        }
        return res.status(200).json({message: "Película encontrada: ", movie: findMovie })
    } catch(error){
        return res.status(500).json({message: "Error interno del servidor.", error: error.message})
    }
}

export const updateMovie = async (req,res) => {
    try {
        const { id } = req.params
        const { title, genre, duration, year, synopsis } = req.body

        const findMovie = await Movie.findByPk(id)
        if (!findMovie) {
            return res.status(404).json({message: "Película no encontrada."})
        }

        if (year && (year < 1888 || year > new Date().getFullYear())){
            return res.status(400).json({message: "El año debe ser mayor o igual a 1888 y menor o igual al año actual."})
        }
        const existingMovie = await Movie.findOne({ where: { title }})
        if (existingMovie && existingMovie.id !== findMovie.id){
            return res.status(400).json({message: "Ya existe una película con ese título."})
        }

        return res.status(200).json({message: "Película actualizada correctamente.", movie: await findMovie.update({ title, genre, duration, year, synopsis })})
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor.", error: error.message})
    }

}

export const deleteMovie = async (req,res) => {
    try{
        const { id } = req.params
        const findMovie = await Movie.findByPk(id)
        if (!findMovie) {
            return res.status(404).json({message: "Película no encontrada."})
        }
        await findMovie.destroy()
        return res.status(200).json({message: "Película eliminada correctamente."})
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor.", error: error.message})
    }
}