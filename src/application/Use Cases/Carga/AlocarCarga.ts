import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";
export class AlocarCarga {
      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _espacoArmazenamento: EspacoArmazenamento): void {
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  if (!_espacoArmazenamento.statusOcupado) {
                        _espacoArmazenamento.armazenarCarga(_carga);
                        _carga.espacoArmazenamento = _espacoArmazenamento;
                  }
            } else {
                  //ERROR
            }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, _nivelAcesso: enumNivelAcesso): boolean {
            return _usuario.nivelAcesso === _nivelAcesso;
      }
}