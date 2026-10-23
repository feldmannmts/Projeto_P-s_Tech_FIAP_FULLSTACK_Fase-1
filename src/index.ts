// src/index.ts
import { app } from "./infrastructure/http/app/app";
const PORT = 3000;
app.listen(PORT, () => {
      console.log(`Servidor QuimiPort Live em http://localhost:${PORT}`);
});

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