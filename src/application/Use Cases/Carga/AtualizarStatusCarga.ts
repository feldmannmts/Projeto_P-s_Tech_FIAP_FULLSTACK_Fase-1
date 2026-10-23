import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { AtualizarStatusCargaDTO } from "../../DTO/cargaDTO";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";

export class AtualizarStatusCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor(private _cargaRepositorie: ICargaRepository) {}


      public async executar(_idAlvo: string, _usuario: IPerfilUsuario, _novoStatus: enumStatusCarga, _cargaDTO: AtualizarStatusCargaDTO): Promise <void> {        
            
            const carga = await this._cargaRepositorie.buscarPorId(_idAlvo);
            if(!carga){
                  throw new Error("Carga não encontrada.");
            }

            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE)) {
                  
                  if (this.ValidarPermissaoCarga(_novoStatus, _usuario, carga)) {    
                        if (carga.status === enumStatusCarga.FINALIZADA || carga.status === enumStatusCarga.CANCELADA) {
                              throw new Error("Não é possível atualizar o status da carga, pois ela já está finalizada ou cancelada.");
                        }


                        carga.status = _novoStatus;
                  }else { 
                        throw new Error("Transição de status não permitida."); 
                  }
                  await this._cargaRepositorie.atualizar(carga);
                  
            } else {
                  throw new Error("Usuário não possui permissão para atualizar o status da carga.");
            }
      }

      private ValidarPermissaoCarga(_novoStatus: enumStatusCarga, _usuario: IPerfilUsuario, _carga: ICargaQuimica): boolean {
            if (_novoStatus === enumStatusCarga.REGISTRADA && _usuario.nivelAcesso >= enumNivelAcesso.OPERADOR_PORTUARIO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.EM_MOVIMENTO && _carga.status === enumStatusCarga.LIBERADA && _usuario.nivelAcesso >= enumNivelAcesso.OPERADOR_PORTUARIO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.EM_ANALISE && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE && _carga.status === enumStatusCarga.REGISTRADA) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.EM_INSPECAO && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE && _carga.status === enumStatusCarga.EM_ANALISE) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.LIBERADA && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE && _carga.status === enumStatusCarga.EM_INSPECAO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.BLOQUEADA && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE && _carga.status === enumStatusCarga.EM_INSPECAO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.CANCELADA && _usuario.nivelAcesso >= enumNivelAcesso.RESPONSAVEL_TECNICO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.FINALIZADA && _carga.status === enumStatusCarga.EM_MOVIMENTO && _usuario.nivelAcesso >= enumNivelAcesso.RESPONSAVEL_TECNICO) {
                  return true;
            }
            else {
                  return false;
            }
      }

}
// export enum enumStatusCarga {
//       EMPTY = "EMPTY",
//       REGISTRADA = "REGISTRADA",
//       EM_ANALISE = "EM_ANALISE",
//       LIBERADA = "LIBERADA",
//       EM_MOVIMENTO = "EM_MOVIMENTO",
//       EM_INSPECAO = "EM_INSPECAO",
//       BLOQUEADA = "BLOQUEADA",
//       CANCELADA = "CANCELADA",
//       FINALIZADA = "FINALIZADA",
// }