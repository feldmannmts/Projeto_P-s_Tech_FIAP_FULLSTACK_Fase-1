import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { ProdutoQuimico } from "../../../domain/Entities/ProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";
import { IProdutoRepository } from "../../Ports/Repositories/RepositorieProduto";
import { CadastrarProdutoInputDTO } from "../../DTO/produtoDTO";
import { enumClasseRisco } from "../../../domain/enums/enumClasseRisco";


export class CadastrarProduto {
      validarPerfil = new ValidarNivelAcesso();

      constructor(private _produtoRepository: IProdutoRepository) {}


      public async executar(_produtoDTO:CadastrarProdutoInputDTO, _usuario: IPerfilUsuario){

            if (!_produtoDTO.nome || _produtoDTO.nome.trim() === "") {
                  throw new Error("O nome do produto químico é obrigatório.");
            }
            if (!_produtoDTO.classeRisco || _produtoDTO.classeRisco === enumClasseRisco.NENHUM) {
                  throw new Error("A classe de risco do produto químico é obrigatória.");
            }

            if (this.validarPerfil.executar(_usuario, enumNivelAcesso.ADMINISTRADOR)) {
                  const novoProdutoQuimico: IProdutoQuimico = new ProdutoQuimico(
                        _produtoDTO.nome,
                        _produtoDTO.codigoONU, 
                        _produtoDTO.classeRisco,
                        _produtoDTO.descricao, 
                        _produtoDTO.grupoCompatibilidade
                  );
                  
                  await this._produtoRepository.salvar(novoProdutoQuimico);
                  return novoProdutoQuimico;
            }

            throw new Error("Usuário não possui permissão para cadastrar produto.");
      }
}