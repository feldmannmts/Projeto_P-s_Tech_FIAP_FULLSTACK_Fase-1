import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";

class RegistrarCarga {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _espacoArmazenamento: EspacoArmazenamento): ICargaQuimica | undefined {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  return _carga;
            }

            throw new Error("Usuário não possui permissão para registrar carga.");
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, _nivelAcesso: enumNivelAcesso): boolean {
            return _usuario.nivelAcesso === _nivelAcesso;
      }
}