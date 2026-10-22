import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
export class ValidarDocumentacao {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _cargaRepositorie: ICargaRepository) {}


      public async executar(_idAlvo: string, _usuario: IUsuario, _idDocumento: string): Promise<void> {
            if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  
                  
                  const carga = await this._cargaRepositorie.buscarPorId(_idAlvo);

                  if(!carga){
                        throw new Error("Carga não Encontrada");

                  }

                  
                  const documento = await carga.listaDocumentosCarga.find(doc => doc.id === _idDocumento);
                  if(!documento){
                        throw new Error("Documento não Encontrado Nessa Carga");

                  }
                  documento.validado=true;
            } else {
                  //ERROR
                  throw new Error("Usuário não possui permissão para Validar Documentos da carga.");

            }
      }
}