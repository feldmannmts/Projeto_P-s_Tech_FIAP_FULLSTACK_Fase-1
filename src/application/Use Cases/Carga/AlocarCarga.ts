import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";
export class AlocarCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_carga: ICargaQuimica, _usuario: IPerfilUsuario, _espacoArmazenamento: EspacoArmazenamento): void {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  if (!_espacoArmazenamento.statusOcupado) {
                        _espacoArmazenamento.armazenarCarga(_carga);
                        _carga.espacoArmazenamento = _espacoArmazenamento;
                  }
            } else {
                  //ERROR
                        throw new Error("Usuário não possui permissão para alocar carga.");

            }
      }

      
}