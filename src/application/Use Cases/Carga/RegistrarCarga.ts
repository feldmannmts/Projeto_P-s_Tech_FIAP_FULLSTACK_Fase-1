import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
//import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";
import { CargaQuimica } from "../../../domain/Entities/CargaQuimica";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import { RegistrarCargaDTO } from "../../DTO/cargaDTO";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";

export class RegistrarCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _cargaRepositorie: ICargaRepository) {}


      public async executar(_usuario: IUsuario,
            _novaCargaDTO: RegistrarCargaDTO,
            //_espacoArmazenamento: EspacoArmazenamento, 
            ): Promise<void> {
                  if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                        
                        const novaCarga = new CargaQuimica('id',_novaCargaDTO.codigoCarga,_usuario,_novaCargaDTO.origemCarga,_novaCargaDTO.destinoCarga,)

                        this._cargaRepositorie.atualizar(novaCarga)
                  }else{
                        throw new Error("Usuário não possui permissão para registrar carga.");
                  }

      }
}