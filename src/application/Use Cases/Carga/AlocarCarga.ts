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
                        throw new Error("Usuário não possui permissão para alocar carga.");

            }
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, nivelAcesso: enumNivelAcesso): boolean {
            if (_usuario.nivelAcesso <= nivelAcesso) {
                  return true;
            }else
                  return false;
      }
}