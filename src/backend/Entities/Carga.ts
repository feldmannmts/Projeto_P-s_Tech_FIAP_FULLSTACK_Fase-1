import { IProdutoQuimico } from "./Interfaces/IProdutoQuimico";
import { IHistoricoCarga } from "./Interfaces/IHistoricoCarga";
import { ICarga, enumStatusCarga } from "./Interfaces/ICargaQuimica";
import {IUsuario} from "./Interfaces/IUsuario";
class Carga implements ICarga {
      id = '';
      status = enumStatusCarga.EMPTY;
      listaProduto = [] as IProdutoQuimico[];
      histórico = {} as IHistoricoCarga;
      listaDocumentosCarga = [] as IDocumentoCarga[];
      responsavelTecnico = {} as IUsuario;

      constructor(_id: string, _status: enumStatusCarga, _listaProduto: IProdutoQuimico[], _histórico: IHistoricoCarga, _listaDocumentosCarga: IDocumentoCarga[], _responsavelTecnico: IUsuario) {
            this.id = _id;
            this.status = _status;
            this.listaProduto = _listaProduto;
            this.histórico = _histórico;
            this.listaDocumentosCarga = _listaDocumentosCarga;
            this.responsavelTecnico = _responsavelTecnico;
      }
}