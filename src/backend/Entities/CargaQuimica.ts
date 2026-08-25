import { IProdutoQuimico } from "./Domain Interfaces/IProdutoQuimico";
import { IHistoricoCarga } from "./Aggregate Interfaces/IHistoricoCarga";
import { ICargaQuimica, enumStatusCarga } from "./Domain Interfaces/ICargaQuimica";
import {IUsuario} from "./Domain Interfaces/IUsuario";
import { EspacoArmazenamento } from "./AreaArmazenamento";
export class CargaQuimica implements ICargaQuimica {
      id = '';
      status = enumStatusCarga.EMPTY;
      listaProduto = [] as IProdutoQuimico[];
      histórico = {} as IHistoricoCarga;
      listaDocumentosCarga = [] as IDocumentoCarga[];
      responsavelTecnico = {} as IUsuario;
      espacoArmazenamento = {} as EspacoArmazenamento;

      constructor(_id: string, _responsavelTecnico: IUsuario, _espacoArmazenamento: EspacoArmazenamento) {
            this.id = _id;
            this.responsavelTecnico = _responsavelTecnico;
            this.espacoArmazenamento = _espacoArmazenamento;
      }
}