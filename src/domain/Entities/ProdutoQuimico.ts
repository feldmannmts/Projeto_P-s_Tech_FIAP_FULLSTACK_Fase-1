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

      constructor(_nome: string, _codigoONU: string, _classeRisco: enumClasseRisco, _descricao: string = "", _grupoCompatibilidade: string = "") {

            this.id = Date.now().toString(); // Gera um ID único para o produto
            this.nome = _nome;
            this.codigoONU = _codigoONU;
            this.classeRisco = _classeRisco;
            this.descricao = _descricao;
            this.grupoCompatibilidade = _grupoCompatibilidade;
            this.statusAtivo = true;
            this.historicoAtualizacoes = new Historico();
      }


}