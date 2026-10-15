import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { IDocumentoCarga } from "../../../domain/Entities/Aggregate Interfaces/IDocumentoCarga";

export class LiberarCarga {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _listaDocumentosExigidos: IDocumentoCarga[]): void {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.INSPETOR_QUALIDADE) && 
            this.ValidarDocumentosCarga(_carga, _listaDocumentosExigidos)) {
                  _carga.status = enumStatusCarga.LIBERADA;
      } else {
            throw new Error("Usuário não possui permissão para liberar carga.");
      }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso <= nivelAcesso) {
                  return true;
            }else
                  return false;
      }

      private ValidarDocumentosCarga(_carga: ICargaQuimica, _listaDocumentosExigidos: IDocumentoCarga[]): boolean {
            _carga.listaDocumentosCarga.forEach((documento) => {
                  if (!_listaDocumentosExigidos.includes(documento)) {
                        return false;
                  }
            });
            return true;
      }
}