import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { ProdutoQuimico } from "../../../domain/Entities/ProdutoQuimico";
import {IPerfilUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";
import { IProdutoRepository } from "../../Ports/Repositories/RepositorieProduto";
import { CadastrarProdutoInputDTO } from "../../DTO/produtoDTO";


export class CadastrarProduto {
      validarPerfil = new ValidarNivelAcesso();

      constructor(private _produtoRepository: IProdutoRepository) {}


      public async executar(_produtoDTO:CadastrarProdutoInputDTO, _usuario: IPerfilUsuario){
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