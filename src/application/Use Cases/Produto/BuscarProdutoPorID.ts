import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";


export class BuscarProdutoPorID{
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();


      public executar(_usuario: IUsuario,
                        _listaProdutos: IProdutoQuimico[],
                        _idAlvo: string,
                        ): IProdutoQuimico{
                  if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.RESPONSAVEL_TECNICO)) {
                        const produtoAlvo = _listaProdutos.find(produto => produto.id === _idAlvo);
                        if (produtoAlvo) {
                              return produtoAlvo;
                        }else
                              throw new Error("Produto Não Existe");
                  }else{
                        throw new Error("Usuário não possui permissão para alterar o produto.");
                  }
      }
}