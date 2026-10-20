import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { AtualizarStatusCarga } from "./AtualizarStatusCarga";

export class LiberarCarga {
      public executar(_carga: ICargaQuimica, _usuario: IUsuario): void {
            if(ValidaProdutosCarga(_carga)) {
                  if(ValidaQuantidadeProdutosCarga(_carga)) {
                        if(ValidaDocumentosCarga(_carga)) {
                              if(ValidaStatusCarga(_carga)) {
                                    const cargaManager = new AtualizarStatusCarga().executar(_carga, _usuario.perfilUsuario, enumStatusCarga.LIBERADA);
                              
                              
                              }else throw Error("Carga está Bloqueada ou Cancelada");
                        }else throw Error("Documentação obrigatória não está completamente validada.");
                  }else throw Error("Carga está Vazia");
            }else throw Error("Produtos da Carga não estão validados");
      
      }
}

function ValidaProdutosCarga(_carga: ICargaQuimica): boolean {
      return _carga.listaProduto.every((_produto: IProdutoQuimico) => _produto.statusAtivo === true);
}

function ValidaQuantidadeProdutosCarga(_carga: ICargaQuimica): boolean {
      return _carga.listaProduto.length > 0;
}

function ValidaDocumentosCarga(_carga: ICargaQuimica): boolean {
      return _carga.listaDocumentosCarga.every((_documento) => _documento.validado === true);
}

function ValidaStatusCarga(_carga: ICargaQuimica): boolean {
      return _carga.status !== enumStatusCarga.BLOQUEADA && _carga.status !== enumStatusCarga.CANCELADA;
}
