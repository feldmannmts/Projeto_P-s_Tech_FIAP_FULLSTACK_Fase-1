export interface IDocumentoCarga{
      id: string;
      nome: string;
      descricao: string;
      validado: boolean;
      arquivo?: string;

      setArquivo(arquivo: string): void;
      getArquivo(): string | undefined;
}