import { enumTipoVeiculo } from "../../enums/enumTipoVeiculo";
import { ICargaQuimica as ICargaQuimica } from "../Domain Interfaces/ICargaQuimica";

export interface IVeiculo{
      id: string;
      tipoVeiculo: enumTipoVeiculo;
      status: string;
      cargasCarregadas: ICargaQuimica[];
      
      carregarCarga(carga: ICargaQuimica): void;
      descarregarCarga(carga: ICargaQuimica): void;
      alterarStatus(status: string): void;
}

