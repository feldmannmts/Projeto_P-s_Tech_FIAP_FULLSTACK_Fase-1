import { Router } from "express";
import { produtoController } from "../../../Composition/container";
const produtoRoutes = Router();
produtoRoutes.post("/", produtoController.cadastrarProduto);
produtoRoutes.get("/", produtoController.listarProdutos);
produtoRoutes.get("/:id", produtoController.buscarProdutoPorID);
produtoRoutes.put("/:id", produtoController.atualizarProduto);
produtoRoutes.patch("/:id/inativar", produtoController.inativarProduto);
export { produtoRoutes };