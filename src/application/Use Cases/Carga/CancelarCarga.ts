import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";

export class CancelarCarga {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario): void {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE)) {
                  _carga.status = enumStatusCarga.CANCELADA;
      } else {
      // ERROR
      }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            return true;
      }
}