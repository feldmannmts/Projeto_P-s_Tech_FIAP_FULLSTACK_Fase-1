import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { CargaDTO } from "../../DTO/cargaDTO";

export class ListarCargas {
      public executar(_cargaDTO: CargaDTO, _usuario: IPerfilUsuario): ICargaQuimica[] {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  return _cargaDTO.listaDeCargas;
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