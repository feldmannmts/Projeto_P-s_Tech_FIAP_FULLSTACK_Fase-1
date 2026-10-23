import {ProdutoRepositoryMemoria, CargaQuimicaRepositoryMemoria} from "../adapters/repositories/RepositorieMemoria";



// Use Cases de Produto
import { CadastrarProduto } from "../application/Use Cases/Produto/CadastrarProduto";
import { ListarProdutos } from "../application/Use Cases/Produto/ListarProdutos";
import { BuscarProdutoPorID } from "../application/Use Cases/Produto/BuscarProdutoPorID";
import { AtualizarProduto } from "../application/Use Cases/Produto/AtualizarProduto";
import { InativarProduto } from "../application/Use Cases/Produto/InativarProduto";

// Use Cases de Carga
import { RegistrarCarga } from "../application/Use Cases/Carga/RegistrarCarga";
import { ListarCargas } from "../application/Use Cases/Carga/ListarCargas";
import { GetCargaId } from "../application/Use Cases/Carga/GetCargaID";
import { AtualizarStatusCarga } from "../application/Use Cases/Carga/AtualizarStatusCarga";
import { BloquearCarga } from "../application/Use Cases/Carga/BloquearCarga";
import { LiberarCarga } from "../application/Use Cases/Carga/LiberarCarga";
import { CancelarCarga } from "../application/Use Cases/Carga/CancelarCarga";
import { ValidarDocumentacao } from "../application/Use Cases/Carga/ValidarDocumentacao";

// Controllers
import { ProdutoController } from "../adapters/controllers/ProdutoController";
import { CargaController } from "../adapters/controllers/CargaController";

// 1. Instâncias únicas dos Repositórios (Singletons)
export const produtoRepository = new ProdutoRepositoryMemoria();
export const cargaRepository = new CargaQuimicaRepositoryMemoria();

// 2. Montagem dos Use Cases de Produto
const cadastrarProdutoUC = new CadastrarProduto(produtoRepository);
const listarProdutosUC = new ListarProdutos(produtoRepository);
const buscarProdutoPorIdUC = new BuscarProdutoPorID(produtoRepository);
const atualizarProdutoUC = new AtualizarProduto(produtoRepository);
const inativarProdutoUC = new InativarProduto(produtoRepository);

// 3. Montagem dos Use Cases de Carga
const atualizarStatusCargaUC = new AtualizarStatusCarga(cargaRepository);
const bloquearCargaUC = new BloquearCarga(cargaRepository);
const cancelarCargaUC = new CancelarCarga(cargaRepository);
const getCargaIdUC = new GetCargaId(cargaRepository);
const liberarCargaUC = new LiberarCarga(cargaRepository);
const listarCargasUC = new ListarCargas(cargaRepository);
const registrarCargaUC = new RegistrarCarga(cargaRepository, produtoRepository);
const validarDocumentacaoUC = new ValidarDocumentacao(cargaRepository);

// 4. Montagem e Exportação dos Controllers prontos para uso
export const produtoController = new ProdutoController(
      cadastrarProdutoUC,
      listarProdutosUC,
      buscarProdutoPorIdUC,
      atualizarProdutoUC,
      inativarProdutoUC
);

export const cargaController = new CargaController(
      atualizarStatusCargaUC,
      bloquearCargaUC,
      cancelarCargaUC,
      getCargaIdUC,
      liberarCargaUC,
      listarCargasUC,
      registrarCargaUC,
      validarDocumentacaoUC
);