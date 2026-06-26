import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";


export const Movie = sequelize.define("Movies", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    synopsis: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    timestamps: false
})