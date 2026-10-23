import { Router } from "express";
import { cargaController } from "../../../Composition/container";

const cargaRoutes = Router();

cargaRoutes.post("/", cargaController.registrarCarga);
cargaRoutes.get("/", cargaController.listarCargas);
cargaRoutes.get("/:id", cargaController.getCargaByID);
cargaRoutes.patch("/:id/status", cargaController.atualizarStatusCarga);
cargaRoutes.patch("/:id/bloquear", cargaController.bloquearCarga);
cargaRoutes.patch("/:id/liberar", cargaController.liberarCarga);
cargaRoutes.patch("/:id/cancelar", cargaController.cancelarCarga);
cargaRoutes.patch("/:idCarga/documentos/:idDocumento/validar", cargaController.validarDocumentacao);

export { cargaRoutes };