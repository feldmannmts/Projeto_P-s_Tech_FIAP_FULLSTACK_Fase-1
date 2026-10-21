import { IProdutoQuimico } from "../../domain/Entities/Domain Interfaces/IProdutoQuimico";
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

export interface BuscarProdutoPorIDInputDTO {
      id: string;
}

export interface InativarProdutoInputDTO {
      statusAtivo: boolean;
}



// ==========================================
// 2. DTOs DE SAÍDA (RESPONSES)
// ==========================================
export interface ListarProdutosOutputDTO{
      listaProdutos: IProdutoQuimico[];
}
export interface ProdutoResponseDTO {
      id: string;
      nome: string;
      descricao: string;
      codigoONU: string;
      classeRisco: enumClasseRisco;
      grupoCompatibilidade: string;
      statusAtivo: boolean;
}