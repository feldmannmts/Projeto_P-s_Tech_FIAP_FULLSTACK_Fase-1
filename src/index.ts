import { app } from "./infrastructure/http/app/app";
import { inicializarBanco } from "./infrastructure/database/connection";

const PORT = 35500;

inicializarBanco()
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`🚀 Servidor QuimiPort Live em http://localhost:${PORT}`);
            });
      })
      .catch((erro) => {
            console.error("❌ Erro ao conectar no PostgreSQL:", erro);
      });