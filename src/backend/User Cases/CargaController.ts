import { ICarga, enumStatusCarga } from "../Entities/Interfaces/ICarga";

class CargaController{
      carga!: ICarga;

      CargaController(_carga: ICarga) {
            this.carga = _carga;
      }

      liberarCarga(): void {
            this.carga.status = enumStatusCarga.LIBERADA;
      }

      bloquearCarga(): void {
            this.carga.status = enumStatusCarga.BLOQUEADA;
      }

      cancelarCarga(): void {
            this.carga.status = enumStatusCarga.CANCELADA;
      }

      atualizarStatus(_status?: enumStatusCarga): void {
            if (_status !== undefined) {
                  this.carga.status = _status;
            }
      }
}