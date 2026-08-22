import {IVeiculo, enumTipoVeiculo} from "./Interfaces/IVeiculo";
import {ICarga} from "./Interfaces/ICarga";

class Navio implements IVeiculo {
      id = '';
      tipoVeiculo = enumTipoVeiculo.NAVIO;
      status = '';
      cargasCarregadas: ICarga[] = [];

      constructor(_id: string) {
            this.id = _id;
      }

      carregarCarga(carga: ICarga): void {
            this.cargasCarregadas.push(carga);
      }

      descarregarCarga(carga: ICarga): void {
            this.cargasCarregadas = this.cargasCarregadas.filter(c => c !== carga);
      }

      alterarStatus(status: string): void {
            this.status = status;
      }
}

class Caminhao implements IVeiculo {
      id = '';
      tipoVeiculo = enumTipoVeiculo.CAMINHAO;
      status = '';
      cargasCarregadas: ICarga[] = [];

      constructor(_id: string) {
            this.id = _id;
      }

      carregarCarga(carga: ICarga): void {
            this.cargasCarregadas.push(carga);
      }

      descarregarCarga(carga: ICarga): void {
            this.cargasCarregadas = this.cargasCarregadas.filter(c => c !== carga);
      }

      alterarStatus(status: string): void {
            this.status = status;
      }
}