import { IHistoricoCarga } from "../Aggregate Interfaces/IHistoricoCarga";
import { EspacoArmazenamento } from "../AreaArmazenamento";
import { IProdutoQuimico } from "../Domain Interfaces/IProdutoQuimico";
import { IUsuario, IPerfilUsuario } from "../Domain Interfaces/IUsuario";
import {enumStatusCarga} from "../../enums/enumStatusCarga";
export interface ICargaQuimica {
      id: string;
      status: enumStatusCarga;
      listaProduto: IProdutoQuimico[];
      histórico: IHistoricoCarga;
      listaDocumentosCarga: IDocumentoCarga[];
      responsavelTecnico: IPerfilUsuario;
      espacoArmazenamento: EspacoArmazenamento;
}