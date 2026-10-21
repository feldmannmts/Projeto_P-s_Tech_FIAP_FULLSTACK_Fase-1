import { ICargaQuimica } from "../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { IDocumentoCarga } from "../../domain/Entities/Aggregate Interfaces/IDocumentoCarga";
import { IProdutoQuimico } from "../../domain/Entities/Domain Interfaces/IProdutoQuimico";
import { enumStatusCarga} from "../../domain/enums/enumStatusCarga";
import { ProdutoResponseDTO } from "./produtoDTO";




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
      motivo: string;
}

export interface CancelarCargaDTO {
      motivo: string;
}

export interface GetCargaIdOutputDTO {
      id: string;
}

export interface LiberarCargaInputDTO {
      codigoCarga: string;
      produtoId: string;
      quantidade: IProdutoQuimico[];
      status: enumStatusCarga;
}

export interface ListarCargasOutputDTO {
      listaCargas: ICargaQuimica[];
}

export interface ValidarDocumentoInputDTO {
      listaDocumentosCarga: IDocumentoCarga[];
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


export interface CargaResponseDTO {
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
      produto: ProdutoResponseDTO;
      documentos: DocumentoCargaOutputDTO[];
      historico: HistoricoAtualizacaoOutputDTO[];
      dataEntrada: string | Date;
      dataCriacao: string | Date;
      dataAtualizacao: string | Date;
}