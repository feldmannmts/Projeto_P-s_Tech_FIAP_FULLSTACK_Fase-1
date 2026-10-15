import { IProdutoQuimico } from "./Domain Interfaces/IProdutoQuimico";
import{ enumClasseRisco } from "../enums/enumClasseRisco";
import { Historico } from "./Historico";
export class ProdutoQuimico implements IProdutoQuimico {
      id = '';
      nome = '';
      descricao = '';
      codigoONU = '';
      classeRisco = enumClasseRisco.NENHUM;
      grupoCompatibilidade = '';
      statusAtivo = false;
      historicoAtualizacoes = new Historico();

      constructor(_nome: string, _codigo: string, _classeRisco: enumClasseRisco) {
            this.nome = _nome;
            this.id = _codigo;
            this.classeRisco = _classeRisco;
            this.statusAtivo = true;
            this.historicoAtualizacoes = new Historico();
      }


}