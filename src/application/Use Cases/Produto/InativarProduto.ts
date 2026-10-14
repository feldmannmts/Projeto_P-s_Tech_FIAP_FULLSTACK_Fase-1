import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";

class InativarProduto {
      public executar(_produto: IProdutoQuimico, _usuario: IPerfilUsuario){
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.ADMINISTRADOR)) {
                  _produto.ativo = false;
                  return _produto;
            }

            throw new Error("Usuário não possui permissão para inativar produto.");
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, _nivelAcesso: enumNivelAcesso): boolean {
            return _usuario.nivelAcesso === _nivelAcesso;
      }
}