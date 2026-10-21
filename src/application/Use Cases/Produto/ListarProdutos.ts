import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import { IProdutoRepository } from "../../Ports/Repositories/RepositorieProduto";

export class ListarProdutos {
      validaNivelAcesso = new ValidarNivelAcesso;
      constructor(private _produtoRepository: IProdutoRepository) {}

      public async executar(_usuario: IPerfilUsuario): Promise<IProdutoQuimico[]>{
            if (this.validaNivelAcesso.executar(_usuario, enumNivelAcesso.RESPONSAVEL_TECNICO)) {
                  const listaProduto = await this._produtoRepository.listar();
                  return listaProduto;
            }

            throw new Error("Usuário não possui permissão para cadastrar produto.");
      }


}