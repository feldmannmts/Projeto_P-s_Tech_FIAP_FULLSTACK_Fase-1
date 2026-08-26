import { IProdutoQuimico } from "./Domain Interfaces/IProdutoQuimico";
import { IHistoricoCarga } from "./Aggregate Interfaces/IHistoricoCarga";
import { ICargaQuimica, enumStatusCarga } from "./Domain Interfaces/ICargaQuimica";
import {IPerfilUsuario, IUsuario} from "./Domain Interfaces/IUsuario";
import { EspacoArmazenamento } from "./AreaArmazenamento";
export class CargaQuimica implements ICargaQuimica {
      id = '';
      status = enumStatusCarga.EMPTY;
      listaProduto = [] as IProdutoQuimico[];
      histórico = {} as IHistoricoCarga;
      listaDocumentosCarga = [] as IDocumentoCarga[];
      responsavelTecnico = {} as IPerfilUsuario;
      espacoArmazenamento = {} as EspacoArmazenamento;

      constructor(_id: string, _responsavelTecnico: IPerfilUsuario, _espacoArmazenamento: EspacoArmazenamento) {
            this.id = _id;
            this.responsavelTecnico = _responsavelTecnico;
            this.espacoArmazenamento = _espacoArmazenamento;
      }
}