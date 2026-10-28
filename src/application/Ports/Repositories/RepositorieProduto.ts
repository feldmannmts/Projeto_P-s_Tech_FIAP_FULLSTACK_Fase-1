import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
export interface IProdutoRepository {
      salvar(produto: IProdutoQuimico): Promise<void>;
      buscarPorId(id: string): Promise<IProdutoQuimico | null>;
      listar(): Promise<IProdutoQuimico[]>;
      atualizar(produto: IProdutoQuimico): Promise<void>;
}