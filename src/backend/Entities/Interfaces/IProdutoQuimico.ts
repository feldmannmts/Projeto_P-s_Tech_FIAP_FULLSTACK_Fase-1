interface IProdutoQuimico{
      codigo: string;
      nome: string;
      classeRisco: string;
      ativo: boolean;

      cadastrarProduto(): void;
      ativarProduto(): void;
      desativarProduto(): void;
}