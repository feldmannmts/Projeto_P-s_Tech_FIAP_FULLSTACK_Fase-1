import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";

export class ListarCargas {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _cargaRepositorie: ICargaRepository) {}



      public async executar(_usuario: IPerfilUsuario): Promise<ICargaQuimica[]> {
            if (this.validarNivelAcesso.executar(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  const listaCargas = this._cargaRepositorie.listar();
                  return listaCargas;
            } else {
                  throw new Error("Usuário não tem permissão para listar cargas.");
            }
      }
}