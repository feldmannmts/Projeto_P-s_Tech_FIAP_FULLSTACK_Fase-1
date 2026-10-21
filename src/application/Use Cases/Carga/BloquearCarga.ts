import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { AtualizarStatusCarga } from "./AtualizarStatusCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import {AtualizacaoHistorico} from "../../../domain/Entities/Historico"

export class BloquearCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_carga: ICargaQuimica, _usuario: IUsuario, _motivo: string): void {

            if(this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.INSPETOR_QUALIDADE)){

                  //ATUALIZA HISTORICO DA CARGA
                  _carga.histórico.listaAtualizacoes.push( 
                        new AtualizacaoHistorico(new Date(),_motivo, _carga.status,enumStatusCarga.BLOQUEADA))

                  //MUDA STATUS PRA BLOQUEADA
                  const cargaManager = new AtualizarStatusCarga().executar(_carga, _usuario.perfilUsuario, enumStatusCarga.BLOQUEADA);
            }
      }

}

