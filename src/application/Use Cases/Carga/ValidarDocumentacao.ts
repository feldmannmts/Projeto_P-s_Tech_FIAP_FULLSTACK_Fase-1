import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { IDocumentoCarga } from "../../../domain/Entities/Aggregate Interfaces/IDocumentoCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
export class ValidarDocumentacao {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _documento: IDocumentoCarga): void {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  _documento.validado = true;
            } else {
                  //ERROR
                  throw new Error("Usuário não possui permissão para Validar Documentos da carga.");

            }
      }
}