import { IHistorico} from "./Aggregate Interfaces/IHistorico";
import { IHistoricoAtualizacao } from "./Aggregate Interfaces/IHistoricoAtualizacao";

export class Historico implements IHistorico {
      listaAtualizacoes;

      constructor() {
            this.listaAtualizacoes = [] as IHistoricoAtualizacao[];
      }

}

export class Atualizacao implements IHistoricoAtualizacao {
      id = '';
      dataMudanca = new Date();
      horarioMudanca = '';
      descricao = '';

      constructor(_id: string, _dataMudanca: Date, _horarioMudanca: string) {
            this.id = _id;
            this.dataMudanca = _dataMudanca;
            this.horarioMudanca = _horarioMudanca;
            this.descricao = "CARGA CRIADA";
      }
}