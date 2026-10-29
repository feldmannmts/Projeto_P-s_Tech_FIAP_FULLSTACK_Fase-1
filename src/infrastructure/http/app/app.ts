// src/infrastructure/http/app/app.ts
import express from "express";
import { produtoRoutes } from "../routes/ProdutoRoutes";
import { cargaRoutes } from "../routes/CargaRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../swagger";

export const app = express();

// 1. Permite que o Express leia JSON no req.body
app.use(express.json());


app.use((req, _res, next) => {
      if (!req.body) req.body = {};
      if (!req.body.usuario) {
            req.body.usuario = {
                  id: "user-1",
                  nome: "Admin Teste",
                  nivelAcesso: 4, // Caso o UseCase espere IPerfilUsuario direto
                  perfilUsuario: { nivelAcesso: 4 } // Caso o UseCase espere IUsuario
            };
      }
      next();
});

// 2. Middleware de Logs e Observabilidade Inicial
app.use((req, res, next) => {
      const inicio = Date.now();
      res.on("finish", () => {
            const duracao = Date.now() - inicio;
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> Status: ${res.statusCode} (${duracao}ms)`);
      });
      next();
});

// 3. Registro das Rotas Principais
app.use("/produtos-quimicos", produtoRoutes);
app.use("/cargas-quimicas", cargaRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));