import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";



export class GetCargaId {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_listaCargaQuimicas: ICargaQuimica[],_idAlvo: string, _usuario: IPerfilUsuario): ICargaQuimica[] {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  return _listaCargaQuimicas.filter((carga) => carga.id === _idAlvo);
            } else {
                  throw new Error("Usuário não tem permissão para procurar por cargas");
            }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso <= nivelAcesso) {
                  return true;
            }else
                  return false;
      }
}