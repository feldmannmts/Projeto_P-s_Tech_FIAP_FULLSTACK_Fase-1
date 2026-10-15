import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";
export class ValidarDocumentacao {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _documento: IDocumentoCarga): void {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  _documento.validado = true;
            } else {
                  //ERROR
                  throw new Error("Usuário não possui permissão para Validar Documentos da carga.");

            }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso <= nivelAcesso) {
                  return true;
            }else
                  return false;
      }
}