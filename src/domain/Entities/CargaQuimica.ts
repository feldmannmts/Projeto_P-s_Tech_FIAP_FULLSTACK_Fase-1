import { IProdutoQuimico } from "./Domain Interfaces/IProdutoQuimico";
import { IHistorico } from "./Aggregate Interfaces/IHistorico";
import { Historico, Atualizacao } from "./Historico";
import { ICargaQuimica} from "./Domain Interfaces/ICargaQuimica";
import {IUsuario} from "./Domain Interfaces/IUsuario";
import { EspacoArmazenamento } from "./AreaArmazenamento";
import { enumStatusCarga } from "../enums/enumStatusCarga";
import { IDocumentoCarga } from "./Aggregate Interfaces/IDocumentoCarga";

export class CargaQuimica implements ICargaQuimica {
      id = '';
      codigoCarga = '';
      status = enumStatusCarga.EMPTY;
      listaProduto = [] as IProdutoQuimico[];
      unidadeMedida = '';
      origemCarga = '';
      destinoCarga = '';
      histórico = {} as IHistorico;
      listaDocumentosCarga = [] as IDocumentoCarga[];
      responsavelTecnico = {} as IUsuario;
      espacoArmazenamento = {} as EspacoArmazenamento;

      constructor(_id: string, 
            _codigoCarga: string, 
            _responsavelTecnico: IUsuario,
            _espacoArmazenamento: EspacoArmazenamento, 
            _origemCarga?: string, 
            _destinoCarga?: string, 
            _produtoQuimico?: IProdutoQuimico)        
      {
                  this.id = _id;
                  this.codigoCarga = _codigoCarga;
                  this.responsavelTecnico = _responsavelTecnico;
                  this.espacoArmazenamento = _espacoArmazenamento;
                  this.status = enumStatusCarga.REGISTRADA;

                  if (_produtoQuimico && _produtoQuimico.statusAtivo != false) {
                        this.listaProduto.push(_produtoQuimico);

                        this.histórico = new Historico();
                        this.histórico.listaAtualizacoes.push(new Atualizacao('1', new Date(), new Date().toLocaleTimeString()));
                  }else{
                        throw new Error("Produto químico não está ativo ou não foi informado.");
                  }

                  
      }
}