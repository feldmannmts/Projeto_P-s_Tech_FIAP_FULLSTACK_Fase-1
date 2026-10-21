import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";


export class InativarProduto {
      validarPerfil = new ValidarNivelAcesso;
      public executar(_produto: IProdutoQuimico, _usuario: IPerfilUsuario){
            if (this.validarPerfil.executar(_usuario, enumNivelAcesso.ADMINISTRADOR)) {
                  _produto.statusAtivo = false;
                  return _produto;
            }

            throw new Error("Usuário não possui permissão para inativar produto.");
      }
}