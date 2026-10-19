import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";

export class AtualizarStatusCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _novoStatus: enumStatusCarga): void {        
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE)) {
                  if (this.ValidarPermissao(_novoStatus, _usuario, _carga)) {
                        if (_carga.status === enumStatusCarga.FINALIZADA || _carga.status === enumStatusCarga.CANCELADA) {
                              throw new Error("Não é possível atualizar o status da carga, pois ela já está finalizada ou cancelada.");
                        }
                        _carga.status = _novoStatus;
                  }
            } else {
                  throw new Error("Usuário não possui permissão para atualizar o status da carga.");
            }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso >= nivelAcesso) {
                  return true;
            }else
                  return false;
      }

      private ValidarPermissao(_novoStatus: enumStatusCarga, _usuario: IPerfilUsuario, _carga: ICargaQuimica): boolean {
            if (_novoStatus === enumStatusCarga.REGISTRADA && _usuario.nivelAcesso >= enumNivelAcesso.OPERADOR_PORTUARIO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.EM_MOVIMENTO && _carga.status === enumStatusCarga.LIBERADA && _usuario.nivelAcesso >= enumNivelAcesso.OPERADOR_PORTUARIO) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.EM_ANALISE && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.EM_INSPECAO && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.LIBERADA && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE) {
                  return true;
            }
            else if (_novoStatus === enumStatusCarga.BLOQUEADA && _usuario.nivelAcesso >= enumNivelAcesso.INSPETOR_QUALIDADE) {
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