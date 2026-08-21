interface IHistoricoCarga {
      listaAtualizacoes: IAtualizacao[];
}

interface IAtualizacao {
      id: string;
      dataMudanca: Date;
      horarioMudanca: string;
      descricao: string;
}