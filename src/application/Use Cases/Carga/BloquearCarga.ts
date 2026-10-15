import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";

export class BloquearCarga {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario): void {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE)) {
                  _carga.status = enumStatusCarga.BLOQUEADA;
      } else {
      // ERROR
            throw new Error("Usuário não possui permissão para bloquear carga.");

      }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso <= nivelAcesso) {
                  return true;
            }else
                  return false;
      }
}