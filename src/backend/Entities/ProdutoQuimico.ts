import { enumClasseRisco, IProdutoQuimico } from "./Domain Interfaces/IProdutoQuimico";

class ProdutoQuimico implements IProdutoQuimico {
      nome = '';
      codigo = '';
      classeRisco = enumClasseRisco.NENHUM;
      ativo = false;

      constructor(_nome: string, _codigo: string, _classeRisco: enumClasseRisco, _ativo: boolean) {
            this.nome = _nome;
            this.codigo = _codigo;
            this.classeRisco = _classeRisco;
            this.ativo = _ativo;
      }


}