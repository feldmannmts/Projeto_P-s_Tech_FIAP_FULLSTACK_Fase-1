import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";



export class GetCargaId {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _cargaRepositorie: ICargaRepository) {}



      public async executar(_idAlvo: string, _usuario: IPerfilUsuario): Promise<ICargaQuimica>  {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.RESPONSAVEL_TECNICO)) {
                  const carga = await this._cargaRepositorie.buscarPorId(_idAlvo)
                  if(!carga){
                        throw new Error("Carga não encontrada.");
                  }

                  return carga;
            } else {
                  throw new Error("Usuário não tem permissão para procurar por cargas");
            }
      }
}