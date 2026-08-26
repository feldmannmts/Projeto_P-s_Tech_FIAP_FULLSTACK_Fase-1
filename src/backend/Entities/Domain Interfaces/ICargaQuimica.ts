import { IHistoricoCarga } from "../Aggregate Interfaces/IHistoricoCarga";
import { EspacoArmazenamento } from "../AreaArmazenamento";
import { IProdutoQuimico } from "../Domain Interfaces/IProdutoQuimico";
import { IUsuario, IPerfilUsuario } from "../Domain Interfaces/IUsuario";
export interface ICargaQuimica {
      id: string;
      status: enumStatusCarga;
      listaProduto: IProdutoQuimico[];
      histórico: IHistoricoCarga;
      listaDocumentosCarga: IDocumentoCarga[];
      responsavelTecnico: IPerfilUsuario;
      espacoArmazenamento: EspacoArmazenamento;
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