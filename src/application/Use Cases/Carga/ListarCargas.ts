import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { CargaDTO } from "../../DTO/cargaDTO";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";

export class ListarCargas {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_listaCargas: ICargaQuimica[], _usuario: IPerfilUsuario): ICargaQuimica[] {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  return _listaCargas;
            } else {
                  throw new Error("Usuário não tem permissão para listar cargas.");
            }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso <= nivelAcesso) {
                  return true;
            }else
                  return false;
      }
}