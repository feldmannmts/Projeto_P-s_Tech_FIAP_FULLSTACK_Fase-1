// src/adapters/repositories/RepositoriePostgres.ts
import { pool } from "../../../infrastructure/database/connection";
import { IProdutoRepository } from "../../../application/Ports/Repositories/RepositorieProduto";
import { ICargaRepository } from "../../../application/Ports/Repositories/RepositorieCarga";
import { IProdutoQuimico } from "../../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";

export class ProdutoRepositoryPostgres implements IProdutoRepository {
      async salvar(produto: IProdutoQuimico): Promise<void> {
            await pool.query(
                  `INSERT INTO produtos_quimicos 
                  (id, nome, descricao, codigo_onu, classe_risco, grupo_compatibilidade, status_ativo, historico)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                  [
                        produto.id,
                        produto.nome,
                        produto.descricao,
                        produto.codigoONU,
                        produto.classeRisco,
                        produto.grupoCompatibilidade,
                        produto.statusAtivo,
                        JSON.stringify(produto.historicoAtualizacoes),
                  ]
            );
      }

      async buscarPorId(id: string): Promise<IProdutoQuimico | null> {
            const res = await pool.query(`SELECT * FROM produtos_quimicos WHERE id = $1`, [id]);
            if (res.rows.length === 0) return null;
            return this.mapearLinhaParaProduto(res.rows[0]);
      }

      async listar(): Promise<IProdutoQuimico[]> {
            const res = await pool.query(`SELECT * FROM produtos_quimicos ORDER BY data_criacao DESC`);
            return res.rows.map((row) => this.mapearLinhaParaProduto(row));
      }

      async atualizar(produto: IProdutoQuimico): Promise<void> {
            await pool.query(
                  `UPDATE produtos_quimicos
                  SET nome = $1, descricao = $2, codigo_onu = $3, classe_risco = $4,
                  grupo_compatibilidade = $5, status_ativo = $6, historico = $7,
                  data_atualizacao = CURRENT_TIMESTAMP
                  WHERE id = $8`,
                  [
                        produto.nome,
                        produto.descricao,
                        produto.codigoONU,
                        produto.classeRisco,
                        produto.grupoCompatibilidade,
                        produto.statusAtivo,
                        JSON.stringify(produto.historicoAtualizacoes),
                        produto.id,
                  ]
            );
      }

      // Converte os nomes das colunas do banco (snake_case) para a interface do Domínio (camelCase)
      private mapearLinhaParaProduto(row: any): IProdutoQuimico {
            return {
                  id: row.id,
                  nome: row.nome,
                  descricao: row.descricao,
                  codigoONU: row.codigo_onu,
                  classeRisco: row.classe_risco,
                  grupoCompatibilidade: row.grupo_compatibilidade,
                  statusAtivo: row.status_ativo,
                  historicoAtualizacoes: row.historico,
            };
      }
}

export class CargaQuimicaRepositoryPostgres implements ICargaRepository {
      async salvar(carga: ICargaQuimica): Promise<void> {
            const produtoId = carga.listaProduto[0]?.id;
            await pool.query(
                  `INSERT INTO cargas_quimicas
                  (id, codigo_carga, status, produto_id, unidade_medida, origem_carga, destino_carga, responsavel_tecnico, documentos, historico)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                  [
                        carga.id,
                        carga.codigoCarga,
                        carga.status,
                        produtoId,
                        carga.unidadeMedida,
                        carga.origemCarga,
                        carga.destinoCarga,
                        JSON.stringify(carga.responsavelTecnico),
                        JSON.stringify(carga.listaDocumentosCarga),
                        JSON.stringify(carga.histórico),
                  ]
            );
      }

      async buscarPorId(id: string): Promise<ICargaQuimica | null> {
            const res = await pool.query(
                  `SELECT c.*, 
                  p.id as prod_id, p.nome as prod_nome, p.descricao as prod_descricao,
                  p.codigo_onu as prod_onu, p.classe_risco as prod_risco,
                  p.grupo_compatibilidade as prod_grupo, p.status_ativo as prod_ativo,
                  p.historico as prod_historico
                  FROM cargas_quimicas c
                  JOIN produtos_quimicos p ON c.produto_id = p.id
                  WHERE c.id = $1`,
                  [id]
            );
            if (res.rows.length === 0) return null;
            return this.mapearLinhaParaCarga(res.rows[0]);
      }

      async listar(): Promise<ICargaQuimica[]> {
            const res = await pool.query(
                  `SELECT c.*, 
                  p.id as prod_id, p.nome as prod_nome, p.descricao as prod_descricao,
                  p.codigo_onu as prod_onu, p.classe_risco as prod_risco,
                  p.grupo_compatibilidade as prod_grupo, p.status_ativo as prod_ativo,
                  p.historico as prod_historico
                  FROM cargas_quimicas c
                  JOIN produtos_quimicos p ON c.produto_id = p.id
                  ORDER BY c.data_criacao DESC`
            );
            return res.rows.map((row) => this.mapearLinhaParaCarga(row));
      }

      async atualizar(carga: ICargaQuimica): Promise<void> {
            await pool.query(
                  `UPDATE cargas_quimicas
                  SET status = $1, documentos = $2, historico = $3, data_atualizacao = CURRENT_TIMESTAMP
                  WHERE id = $4`,
                  [
                        carga.status,
                        JSON.stringify(carga.listaDocumentosCarga),
                        JSON.stringify(carga.histórico),
                        carga.id,
                  ]
            );
      }

      private mapearLinhaParaCarga(row: any): ICargaQuimica {
            const produtoAssociado: IProdutoQuimico = {
                  id: row.prod_id,
                  nome: row.prod_nome,
                  descricao: row.prod_descricao,
                  codigoONU: row.prod_onu,
                  classeRisco: row.prod_risco,
                  grupoCompatibilidade: row.prod_grupo,
                  statusAtivo: row.prod_ativo,
                  historicoAtualizacoes: row.prod_historico,
            };

            return {
                  id: row.id,
                  codigoCarga: row.codigo_carga,
                  status: row.status,
                  listaProduto: [produtoAssociado],
                  unidadeMedida: row.unidade_medida,
                  origemCarga: row.origem_carga,
                  destinoCarga: row.destino_carga,
                  histórico: row.historico,
                  listaDocumentosCarga: row.documentos,
                  responsavelTecnico: row.responsavel_tecnico,
            };
      }
}