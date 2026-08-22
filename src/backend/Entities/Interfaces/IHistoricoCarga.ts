export interface IHistoricoCarga {
      listaAtualizacoes: IAtualizacao[];
}

export interface IAtualizacao {
      id: string;
      dataMudanca: Date;
      horarioMudanca: string;
      descricao: string;
}