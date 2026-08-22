import { IHistoricoCarga } from "./IHistoricoCarga";
import { IProdutoQuimico } from "./IProdutoQuimico";
export interface ICarga {
      id: string;
      status: enumStatusCarga;
      listaProduto: IProdutoQuimico[];
      histórico: IHistoricoCarga;
      listaDocumentosCarga: IDocumentoCarga[];
      responsavelTecnico: IUsuario;
}

export enum enumStatusCarga {
      EMPTY = "EMPTY",
      REGISTRADA = "REGISTRADA",
      EM_MOVIMENTO = "EM_MOVIMENTO",
      EM_INSPECAO = "EM_INSPECAO",
      LIBERADA = "LIBERADA",
      BLOQUEADA = "BLOQUEADA",
      CANCELADA = "CANCELADA",
      FINALIZADA = "FINALIZADA",
}