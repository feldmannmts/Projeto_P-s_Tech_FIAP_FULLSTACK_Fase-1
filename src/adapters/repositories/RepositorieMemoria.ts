// Exemplo: ProdutoRepositoryMemoria.ts
import { ICargaRepository } from "../../application/Ports/Repositories/RepositorieCarga";
import { IProdutoRepository } from "../../application/Ports/Repositories/RepositorieProduto";
import { ICargaQuimica } from "../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../../domain/Entities/Domain Interfaces/IProdutoQuimico";

export class ProdutoRepositoryMemoria implements IProdutoRepository {
      private produtos: IProdutoQuimico[] = [];

      async salvar(produto: IProdutoQuimico): Promise<void> {
            this.produtos.push(produto);
      }
      async buscarPorId(id: string): Promise<IProdutoQuimico | null> {
            return this.produtos.find(p => p.id === id) || null;
      }
      async listar(): Promise<IProdutoQuimico[]> {
            return [...this.produtos];
      }
      async atualizar(produto: IProdutoQuimico): Promise<void> {
            const index = this.produtos.findIndex(p => p.id === produto.id);
            if (index !== -1) this.produtos[index] = produto;
      }
}


export class CargaQuimicaRepositoryMemoria implements ICargaRepository {
      private carga: ICargaQuimica[] = [];

      async salvar(produto: ICargaQuimica): Promise<void> {
            this.carga.push(produto);
      }
      async buscarPorId(id: string): Promise<ICargaQuimica | null> {
            return this.carga.find(p => p.id === id) || null;
      }
      async listar(): Promise<ICargaQuimica[]> {
            return [...this.carga];
      }
      async atualizar(_carga: ICargaQuimica): Promise<void> {
            const index = this.carga.findIndex(p => p.id === _carga.id);
            if (index !== -1) this.carga[index] = _carga;
      }
}