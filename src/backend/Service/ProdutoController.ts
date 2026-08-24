import { IProdutoQuimico, enumClasseRisco } from "../Entities/Domain Interfaces/IProdutoQuimico";

class ProdutoQuimicoController {
      listaProdutosQuimicosCadastrados!: IProdutoQuimico[];

      cadastrarNovoProdutoQuimico(_nome: string, _codigo: string, _classeRisco: enumClasseRisco, _ativo: boolean): void {
            this.listaProdutosQuimicosCadastrados.push({
                  nome: _nome,
                  codigo: _codigo,
                  classeRisco: _classeRisco,
                  ativo: _ativo
            });
      }

      ativarProduto(_produto: IProdutoQuimico): void {
            _produto.ativo = true;
      }
      desativarProduto(_produto: IProdutoQuimico): void {
            _produto.ativo = false;
      }
}