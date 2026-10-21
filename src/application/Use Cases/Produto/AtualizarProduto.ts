import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
import { enumClasseRisco } from "../../../domain/enums/enumClasseRisco";
import {ValidarNivelAcesso} from "../ValidarNivelAcesso";


export class AtualizarProduto {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();


      public executar(_usuario: IUsuario,
                        _listaProdutos: IProdutoQuimico[],
                        _idAlvo: string,
                        _nome?: string,
                        _descricao?: string,
                        _codigoONU?: string,
                        _classeRisco?: enumClasseRisco,
                        _grupoCompatibilidade?: string){

            if (this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.ADMINISTRADOR)) {
                  _listaProdutos.forEach(produto => {
                        if (produto.id === _idAlvo) {
                              produto.nome = _nome ?? produto.nome;
                              produto.descricao = _descricao ?? produto.descricao;
                              produto.codigoONU = _codigoONU ?? produto.codigoONU;
                              produto.classeRisco = _classeRisco ?? produto.classeRisco;
                              produto.grupoCompatibilidade = _grupoCompatibilidade ?? produto.grupoCompatibilidade;
                        }
                  });
                  
            }else{
                  throw new Error("Usuário não possui permissão para alterar o produto.");
            }
      }
}