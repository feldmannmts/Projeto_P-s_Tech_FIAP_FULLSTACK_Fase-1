import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { AtualizarStatusCarga } from "./AtualizarStatusCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import {AtualizacaoHistorico} from "../../../domain/Entities/Historico"
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
import { AtualizarStatusCargaDTO } from "../../DTO/cargaDTO";

export class BloquearCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _cargaRepositorie: ICargaRepository) {}

      public async executar(_idAlvo: string, _usuario: IUsuario, _motivo: string, _cargaDTO: AtualizarStatusCargaDTO): Promise<void> {

            if(this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.INSPETOR_QUALIDADE)){

                  const carga = await this._cargaRepositorie.buscarPorId(_idAlvo);
                  if(!carga){
                        throw new Error("Carga não encontrada.");
                  }

                  //ATUALIZA HISTORICO DA CARGA
                  carga.histórico.listaAtualizacoes.push( 
                        new AtualizacaoHistorico(new Date(),_motivo, carga.status,enumStatusCarga.BLOQUEADA))

                  //MUDA STATUS PRA BLOQUEADA
                  const cargaManager = new AtualizarStatusCarga(this._cargaRepositorie).executar(carga.id, _usuario.perfilUsuario, enumStatusCarga.BLOQUEADA, _cargaDTO);
            }
      }

}

