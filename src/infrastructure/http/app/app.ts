// src/infrastructure/http/app/app.ts
import express from "express";
import { produtoRoutes } from "../routes/ProdutoRoutes";
import { cargaRoutes } from "../routes/CargaRoutes";

export const app = express();

// 1. Permite que o Express leia JSON no req.body
app.use(express.json());

// 2. Middleware de Logs e Observabilidade Inicial (Requisito 10 do Edital)
app.use((req, res, next) => {
      const inicio = Date.now();
      res.on("finish", () => {
            const duracao = Date.now() - inicio;
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> Status: ${res.statusCode} (${duracao}ms)`);
      });
      next();
});

// 3. Registro das Rotas Principais (Requisito 5 do Edital)
app.use("/produtos-quimicos", produtoRoutes);
app.use("/cargas-quimicas", cargaRoutes);