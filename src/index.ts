// src/index.ts
import { app } from "./infrastructure/http/app/app";
const PORT = 35500;
app.listen(PORT, () => {
      console.log(`Servidor QuimiPort Live em http://localhost:${PORT}`);
});
