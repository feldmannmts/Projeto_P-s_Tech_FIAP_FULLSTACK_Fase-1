import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { IProdutoRepository } from "../../Ports/Repositories/RepositorieProduto";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";


export class InativarProduto{
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor(private _produtoRepository: IProdutoRepository) {}

      public async executar(_usuario: IUsuario,
                        _idAlvo: string,
                        ){
                  if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.RESPONSAVEL_TECNICO)) {
                        const produto = await this._produtoRepository.buscarPorId(_idAlvo);

                        if (!produto){
                              throw new Error("Produto não encontrado.");
                        }

                        produto.statusAtivo=false;
                        await this._produtoRepository.atualizar(produto);
                  }else{
                        throw new Error("Usuário não possui permissão para alterar o produto.");
                  }
      }
}