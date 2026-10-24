// src/infrastructure/database/connection.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Pool gerencia as conexões abertas com o PostgreSQL
export const pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "quimiport",
});

// Cria as tabelas automaticamente se ainda não existirem (Modelagem Relacional)
export async function inicializarBanco(): Promise<void> {
      const queryTabelas = `
            CREATE TABLE IF NOT EXISTS produtos_quimicos (
                  id VARCHAR(100) PRIMARY KEY,
                  nome VARCHAR(255) NOT NULL,
                  descricao TEXT,
                  codigo_onu VARCHAR(100) NOT NULL,
                  classe_risco VARCHAR(100) NOT NULL,
                  grupo_compatibilidade VARCHAR(100),
                  status_ativo BOOLEAN DEFAULT TRUE,
                  historico JSONB DEFAULT '{"listaAtualizacoes": []}',
                  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS cargas_quimicas (
                  id VARCHAR(100) PRIMARY KEY,
                  codigo_carga VARCHAR(100) NOT NULL,
                  status VARCHAR(50) NOT NULL,
                  produto_id VARCHAR(100) NOT NULL REFERENCES produtos_quimicos(id),
                  quantidade NUMERIC NOT NULL DEFAULT 1,
                  unidade_medida VARCHAR(50),
                  origem_carga VARCHAR(255),
                  destino_carga VARCHAR(255),
                  responsavel_tecnico JSONB NOT NULL,
                  documentos JSONB DEFAULT '[]',
                  historico JSONB DEFAULT '{"listaAtualizacoes": []}',
                  data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
      `;

      await pool.query(queryTabelas);
      console.log("✅ Banco de dados PostgreSQL conectado e tabelas verificadas!");
}