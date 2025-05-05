import express from "express";
import bodyParser from "body-parser";

// Importación de rutas
import authorRoutes from "./routes/author.routes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

export default app;

//docker-compose up -d
//docker-compose down
