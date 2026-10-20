import { enumStatusCarga } from "../enums/enumStatusCarga";
import { IHistorico} from "./Aggregate Interfaces/IHistorico";
import { IHistoricoAtualizacao } from "./Aggregate Interfaces/IHistoricoAtualizacao";

export class Historico implements IHistorico {
      listaAtualizacoes;

      constructor() {
            this.listaAtualizacoes = [] as IHistoricoAtualizacao[];
      }

}

export class AtualizacaoHistorico implements IHistoricoAtualizacao {
      dataMudanca = new Date();
      descricao = '';
      statusPassado = enumStatusCarga.EMPTY
      statusAtual = enumStatusCarga.EMPTY

      constructor( _dataMudanca: Date, _motivo: string, _statusPassado: enumStatusCarga, _statusAtual:enumStatusCarga) {
            this.dataMudanca = _dataMudanca;
            this.descricao = _motivo;
            this.statusPassado = _statusPassado
            this.statusAtual = _statusPassado
      }
}