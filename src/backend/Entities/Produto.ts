import { IProdutoQuimico } from "./Interfaces/IProdutoQuimico";

class Produto implements IProdutoQuimico {
      nome = '';
      codigo = '';
      classeRisco = '';
      ativo = false;

      Produto(_nome: string, _codigo: string, _classeRisco: string, _ativo: boolean) {
            this.nome = _nome;
            this.codigo = _codigo;
            this.classeRisco = _classeRisco;
            this.ativo = _ativo;
      }
}