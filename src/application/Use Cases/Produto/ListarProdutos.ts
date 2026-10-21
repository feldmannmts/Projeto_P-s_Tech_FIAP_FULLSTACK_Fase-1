import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { ProdutoQuimico } from "../../../domain/Entities/ProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";

export class ListarProdutos {
      validaNivelAcesso = new ValidarNivelAcesso;
      public executar(_usuario: IPerfilUsuario, _listaProdutos: IProdutoQuimico[]): IProdutoQuimico[]{
            if (this.validaNivelAcesso.executar(_usuario, enumNivelAcesso.RESPONSAVEL_TECNICO)) {
                  return _listaProdutos;
            }

            throw new Error("Usuário não possui permissão para cadastrar produto.");
      }


}