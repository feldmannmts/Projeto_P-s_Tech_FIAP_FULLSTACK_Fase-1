import {IVeiculo, enumTipoVeiculo} from "./Aggregate Interfaces/IVeiculo";
import {ICargaQuimica} from "./Domain Interfaces/ICargaQuimica";


class Veiculo {
      id = '';
      tipoVeiculo!: enumTipoVeiculo;
      status = '';
      cargasCarregadas: ICargaQuimica[] = [];

      constructor(_id: string, _tipoVeiculo: enumTipoVeiculo, _status: string) {
            this.id = _id;
            this.tipoVeiculo = _tipoVeiculo;
            this.status = _status;
      }

      carregarCarga(carga: ICargaQuimica): void {
            this.cargasCarregadas.push(carga);
      }

      descarregarCarga(carga: ICargaQuimica): void {
            this.cargasCarregadas = this.cargasCarregadas.filter(c => c !== carga);
      }

      alterarStatus(status: string): void {
            this.status = status;
      }
}