// src/index.ts
import { app } from "./infrastructure/http/app/app";
import { inicializarBanco } from "./infrastructure/database/connection";

const PORT = 35500;

inicializarBanco()
      .catch((erro) => {
            console.warn("⚠️ PostgreSQL não encontrado na porta 5432. Verifique se o serviço está rodando:", erro.code);
      })
      .finally(() => {
            app.listen(PORT, () => {
                  console.log(`🚀 Servidor QuimiPort Live em http://localhost:${PORT}`);
                  console.log(`📄 Documentação Swagger em http://localhost:${PORT}/api-docs`);
            });
      });