import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { ProdutoQuimico } from "../../../domain/Entities/ProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumClasseRisco } from "../../../domain/enums/enumClasseRisco";

class CadastrarProduto {
      public executar(_nome: string, _codigo: string, _classeRisco: enumClasseRisco, _ativo: boolean, _usuario: IPerfilUsuario){
            if (this.ValidarPerfil(_usuario, enumNivelAcesso.ADMINISTRADOR)) {
                  const novoProdutoQuimico: IProdutoQuimico = new ProdutoQuimico(_nome, _codigo, _classeRisco, _ativo);
                  return novoProdutoQuimico;
            }

            throw new Error("Usuário não possui permissão para cadastrar produto.");
      }

      private ValidarPerfil(_usuario: IPerfilUsuario, _nivelAcesso: enumNivelAcesso): boolean {
            return _usuario.nivelAcesso === _nivelAcesso;
      }
}