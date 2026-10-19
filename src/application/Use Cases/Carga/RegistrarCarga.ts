import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import {IPerfilUsuario, IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";
import { CargaQuimica } from "../../../domain/Entities/CargaQuimica";
import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";

class RegistrarNovaCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();

      public executar(_usuario: IUsuario, 
            _espacoArmazenamento: EspacoArmazenamento, 
            _origemCarga?: string, 
            _destinoCarga?: string, 
            _produtoQuimico?: IProdutoQuimico[], 
            ): ICargaQuimica {
                  if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                        return new CargaQuimica( 
                        '1', //ID
                        'CARGA-001', //codigoCarga
                        _usuario, //responsavelTecnico
                        _espacoArmazenamento, //espacoArmazenamento
                        _origemCarga, //origemCarga
                        _destinoCarga, //destinoCarga
                        );
                  }else{
                        throw new Error("Usuário não possui permissão para registrar carga.");
                  }

      }
}