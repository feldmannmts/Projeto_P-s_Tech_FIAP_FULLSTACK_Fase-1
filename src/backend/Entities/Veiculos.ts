import {IVeiculo, enumTipoVeiculo} from "./Interfaces/IVeiculo";
import {ICarga} from "./Interfaces/ICargaQuimica";


class Veiculo {
      id = '';
      tipoVeiculo!: enumTipoVeiculo;
      status = '';
      cargasCarregadas: ICarga[] = [];

      constructor(_id: string, _tipoVeiculo: enumTipoVeiculo, _status: string) {
            this.id = _id;
            this.tipoVeiculo = _tipoVeiculo;
            this.status = _status;
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