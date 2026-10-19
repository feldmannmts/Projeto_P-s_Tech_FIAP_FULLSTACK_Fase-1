import { IDocumentoCarga } from "./Aggregate Interfaces/IDocumentoCarga";

class DocumentoCarga implements IDocumentoCarga {
      id = '';
      nome = '';
      descricao = '';
      validado = false;
      arquivo = '';

      constructor(_id: string, _nome: string, _descricao: string, _arquivo: string) {
            this.id = _id;
            this.nome = _nome;
            this.descricao = _descricao;
            this.arquivo = _arquivo;
      }

      setArquivo(_arquivo: string): void {
            this.arquivo = _arquivo;
      }

      getArquivo(): string | undefined {
            return this.arquivo;
      }
}