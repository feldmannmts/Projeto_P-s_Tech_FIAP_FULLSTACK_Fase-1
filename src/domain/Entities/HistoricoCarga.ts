import { IHistoricoCarga, IAtualizacao } from "./Aggregate Interfaces/IHistoricoCarga";

class HistoricoCarga implements IHistoricoCarga {
      listaAtualizacoes;

      constructor() {
            this.listaAtualizacoes = [] as IAtualizacao[];
      }

}

class Atualizacao implements IAtualizacao {
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