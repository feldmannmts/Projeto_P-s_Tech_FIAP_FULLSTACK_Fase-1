interface IDocumentoCarga{
      id: string;
      nome: string;
      descricao: string;
      arquivo?: string;

      setArquivo(arquivo: string): void;
      getArquivo(): string | undefined;
}