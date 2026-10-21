import { IProdutoQuimico } from "../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../../domain/Entities/Domain Interfaces/IUsuario";
import { enumClasseRisco} from "../../domain/enums/enumClasseRisco"



// ==========================================
// 1. DTOs DE ENTRADA (REQUESTS)
// ==========================================
export interface CadastrarProdutoInputDTO{
      nome: string;
      descricao: string;
      codigoONU:  string;
      classeRisco: enumClasseRisco;
      grupoCompatibilidade: string;
}

export interface AtualizarProdutoInputDTO {
      nome?: string;
      descricao?: string;
      codigoONU?: string;
      classeRisco?: enumClasseRisco;
      grupoCompatibilidade?: string;
}

// ==========================================
// 2. DTOs DE SAÍDA (RESPONSES)
// ==========================================
export interface ProdutoOutputDTO {
      id: string;
      nome: string;
      descricao: string;
      codigoONU: string;
      classeRisco: enumClasseRisco;
      grupoCompatibilidade: string;
      statusAtivo: boolean;
}

export interface ListarProdutosOutputDTO {
      listaProdutos: ProdutoOutputDTO[];
}