import { ICarga } from "./ICarga";

export interface IVeiculo{
      id: string;
      tipoVeiculo: enumTipoVeiculo;
      status: string;
      cargasCarregadas: ICarga[];
      
      carregarCarga(carga: ICarga): void;
      descarregarCarga(carga: ICarga): void;
      alterarStatus(status: string): void;
}

export enum enumTipoVeiculo {
      CAMINHAO = "CAMINHAO",
      NAVIO = "NAVIO",
}