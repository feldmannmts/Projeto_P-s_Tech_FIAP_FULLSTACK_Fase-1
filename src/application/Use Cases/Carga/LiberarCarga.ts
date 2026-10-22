import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { AtualizarStatusCargaDTO } from "../../DTO/cargaDTO";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import { AtualizarStatusCarga } from "./AtualizarStatusCarga";

export class LiberarCarga {

      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _cargaRepositorie: ICargaRepository) {}

      public async executar(_idAlvo: string, _usuario: IUsuario, _cargaDTO: AtualizarStatusCargaDTO): Promise<void> {

            const carga = await this._cargaRepositorie.buscarPorId(_idAlvo);

            if(!carga){
                  throw new Error("Carga não encontrada.");
            }

            if(!ValidaProdutosCarga(carga)) {
                  throw Error("Produtos da Carga não estão validados");
            }
            
            if(!ValidaQuantidadeProdutosCarga(carga)) {
                  throw Error("Carga está Vazia");
            }
            if(!ValidaDocumentosCarga(carga)) {
                  throw Error("Documentação obrigatória não está completamente validada.");
            }
            if(!ValidaStatusCarga(carga)) {                          
                  throw Error("Carga está Bloqueada ou Cancelada");              
            }

            const cargaManager = new AtualizarStatusCarga(this._cargaRepositorie).executar(_idAlvo, _usuario.perfilUsuario, enumStatusCarga.LIBERADA, _cargaDTO);

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
