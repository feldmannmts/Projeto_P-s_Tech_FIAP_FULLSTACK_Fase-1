import { ICargaQuimica, enumStatusCarga } from "../Entities/Interfaces/ICargaQuimica";

class CargaInteractor {
      carga!: ICargaQuimica;

      CargaController(_carga: ICargaQuimica) {
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