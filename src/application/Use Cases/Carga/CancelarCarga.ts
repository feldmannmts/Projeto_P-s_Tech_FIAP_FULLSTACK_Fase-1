import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { AtualizarStatusCarga } from "./AtualizarStatusCarga";
import {AtualizacaoHistorico} from "../../../domain/Entities/Historico";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";


export class CancelarCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_carga: ICargaQuimica, _usuario: IUsuario, _motivo: string): void {

            if(this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.RESPONSAVEL_TECNICO)){

                  //ATUALIZA HISTORICO DA CARGA
                  _carga.histórico.listaAtualizacoes.push( 
                  new AtualizacaoHistorico(new Date(),_motivo, _carga.status,enumStatusCarga.CANCELADA))

                  //MUDA STATUS PRA CANCELADA
                  const cargaManager = new AtualizarStatusCarga().executar(_carga, _usuario.perfilUsuario, enumStatusCarga.CANCELADA);
            }

      }
}