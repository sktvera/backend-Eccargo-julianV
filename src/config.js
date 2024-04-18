import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "mysql-testjulianveccargo.alwaysdata.net";
export const DB_USER = process.env.DB_USER || "356118";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Jdvg12700";
export const DB_DATABASE = process.env.DB_DATABASE || "testjulianveccargo_2";
export const DB_PORT = process.env.DB_PORT || 3306;
