import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumStatusCarga } from "../../../domain/enums/enumStatusCarga";
import { AtualizarStatusCarga } from "./AtualizarStatusCarga";
import {AtualizacaoHistorico} from "../../../domain/Entities/Historico"

export class BloquearCarga {
      public executar(_carga: ICargaQuimica, _usuario: IUsuario, _motivo: string): void {

            //ATUALIZA HISTORICO DA CARGA
            _carga.histórico.listaAtualizacoes.push( 
                  new AtualizacaoHistorico(new Date(),_motivo, _carga.status,enumStatusCarga.BLOQUEADA))

            //MUDA STATUS PRA BLOQUEADA
            const cargaManager = new AtualizarStatusCarga().executar(_carga, _usuario.perfilUsuario, enumStatusCarga.BLOQUEADA);
      }

}

