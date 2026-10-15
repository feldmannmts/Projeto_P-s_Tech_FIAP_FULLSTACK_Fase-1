import { IHistorico } from "../Aggregate Interfaces/IHistorico";
import { EspacoArmazenamento } from "../AreaArmazenamento";
import { IProdutoQuimico } from "../Domain Interfaces/IProdutoQuimico";
import { IUsuario} from "../Domain Interfaces/IUsuario";
import {enumStatusCarga} from "../../enums/enumStatusCarga";
import { IDocumentoCarga } from "../../../domain/Entities/Aggregate Interfaces/IDocumentoCarga";

export interface ICargaQuimica {
      id: string;
      codigoCarga: string;
      status: enumStatusCarga;
      listaProduto: IProdutoQuimico[];
      unidadeMedida: string;
      origemCarga: string;
      destinoCarga: string;
      histórico: IHistorico;
      listaDocumentosCarga: IDocumentoCarga[];
      responsavelTecnico: IUsuario;
      espacoArmazenamento: EspacoArmazenamento;
}