import { Sequelize } from "sequelize";

const database = "movies";
const username = "root";
const password = "";

export const sequelize = new Sequelize(database, username, password, {
    host: "localhost",
    dialect: "mysql",
});

export const startDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};