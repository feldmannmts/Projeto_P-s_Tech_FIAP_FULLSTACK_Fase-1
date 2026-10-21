import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";
import { IProdutoRepository } from "../../Ports/Repositories/RepositorieProduto";
import { AtualizarProdutoInputDTO } from "../../DTO/produtoDTO";


export class AtualizarProduto {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor (private _produtoRepository: IProdutoRepository) {}


      public async executar(_usuario: IUsuario,
                        _idAlvo: string,
                        _produtoDTO: AtualizarProdutoInputDTO): Promise<IProdutoQuimico>{

            if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.ADMINISTRADOR)) {
                  // 2. Busca o produto direto no repositório!
                  const produto = await this._produtoRepository.buscarPorId(_idAlvo);
                  if (!produto) {
                        throw new Error("Produto não encontrado.");
                  }
                  // 3. Atualiza os dados
                  produto.nome = _produtoDTO.nome ?? produto.nome;
                  produto.descricao = _produtoDTO.descricao ?? produto.descricao;
                  produto.codigoONU = _produtoDTO.codigoONU ?? produto.codigoONU;
                  produto.classeRisco = _produtoDTO.classeRisco ?? produto.classeRisco;
                  produto.grupoCompatibilidade = _produtoDTO.grupoCompatibilidade ?? produto.grupoCompatibilidade;
                  // 4. Salva a alteração
                  await this._produtoRepository.atualizar(produto);
                  return produto;

            }else{
                  throw new Error("Usuário não possui permissão para alterar o produto.");
            }
      }
}