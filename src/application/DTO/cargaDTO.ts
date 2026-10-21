import { IDocumentoCarga } from "../../domain/Entities/Aggregate Interfaces/IDocumentoCarga";
import { enumStatusCarga} from "../../domain/enums/enumStatusCarga";
import { ProdutoOutputDTO } from "./produtoDTO";


// ==========================================
// 1. DTOs DE ENTRADA (REQUESTS)
// ==========================================

export interface RegistrarCargaDTO {
      codigoCarga: string;
      produtoId: string;
      responsavelTecnicoId: string;
      origemCarga: string;
      destinoCarga: string;
      quantidade: number;
      unidadeMedida: string;
}
export interface AtualizarStatusCargaDTO {
      novoStatus: enumStatusCarga;
}

export interface BloquearCargaDTO {
      id: string
      motivo: string;
}

export interface CancelarCargaDTO {
      motivo: string;
}

// ==========================================
// 2. DTOs DE SAÍDA (RESPONSES)
// ==========================================
export interface ListarCargasOutputDTO {
      listaCargas: CargaOutputDTO[];
}

export interface DocumentoCargaOutputDTO {
      id: string;
      nome: string;
      descricao: string;
      validado: boolean;
      arquivo?: string;
}
export interface HistoricoAtualizacaoOutputDTO {
      data: Date | string;
      motivo: string;
      statusAnterior: string;
      statusNovo: string;
}


export interface CargaOutputDTO {
      id: string;
      codigoCarga: string;
      quantidade: number;
      unidadeMedida: string;
      origem: string;
      destino: string;
      status: enumStatusCarga;
      responsavelTecnico: {
            id: string;
            nome: string;
            email: string;
      };
      produto: ProdutoOutputDTO;
      documentos: DocumentoCargaOutputDTO[];
      historico: HistoricoAtualizacaoOutputDTO[];
      dataEntrada: string | Date;
      dataCriacao: string | Date;
      dataAtualizacao: string | Date;
}