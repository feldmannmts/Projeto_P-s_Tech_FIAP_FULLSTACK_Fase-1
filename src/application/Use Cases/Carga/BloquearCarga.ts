import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";

export class BloquearCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario): void {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE)) {
                  _carga.status = enumStatusCarga.BLOQUEADA;
      } else {
      // ERROR
            throw new Error("Usuário não possui permissão para bloquear carga.");

      }
      }
}