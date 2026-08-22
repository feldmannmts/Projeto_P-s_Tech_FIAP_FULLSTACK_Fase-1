export interface IProdutoQuimico{
      codigo: string;
      nome: string;
      classeRisco: enumClasseRisco;
      ativo: boolean;

      // cadastrarProduto(): void;
      // ativarProduto(): void;
      // desativarProduto(): void;
}

export const enum enumClasseRisco {
      //FONTE: https://www.fepam.rs.gov.br/upload/arquivos/202212/26133322-manual-classificacao-produto-perigoso.pdf
      NENHUM = "NENHUM",
      CLASSE_1 = "CLASSE_1 - Explosivos",
      CLASSE_2 = "CLASSE_2 - Gases",
      CLASSE_3 = "CLASSE_3 - Liquidos Corrosivos",
      CLASSE_4 = "CLASSE_4 - Solidos Corrosivos",
      CLASSE_5 = "CLASSE_5 - Oxidantes",
      CLASSE_6 = "CLASSE_6 - Toxicos/Infectantes",
      CLASSE_7 = "CLASSE_7 - Radioativos",
      CLASSE_8 = "CLASSE_8 - Corrossivos",
      CLASSE_9 = "CLASSE_9 - Outros",
}