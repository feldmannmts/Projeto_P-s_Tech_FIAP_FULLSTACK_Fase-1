import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";

export class LiberarCarga {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario): void {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE)) {
                  _carga.status = enumStatusCarga.LIBERADA;
      } else {
      // ERROR
      }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            return true;
      }
}