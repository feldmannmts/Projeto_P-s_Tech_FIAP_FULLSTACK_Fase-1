import { enumClasseRisco } from "../../enums/enumClasseRisco";
export interface IProdutoQuimico{
      codigo: string;
      nome: string;
      classeRisco: enumClasseRisco;
      ativo: boolean;

      // cadastrarProduto(): void;
      // ativarProduto(): void;
      // desativarProduto(): void;
}

