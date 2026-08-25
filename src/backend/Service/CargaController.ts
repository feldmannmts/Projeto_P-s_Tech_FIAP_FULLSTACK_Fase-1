import { EspacoArmazenamento } from "../Entities/AreaArmazenamento";
import { ICargaQuimica, enumStatusCarga } from "../Entities/Domain Interfaces/ICargaQuimica";

class CargaController {

      liberarCarga(_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.LIBERADA;
      }

      bloquearCarga(_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.BLOQUEADA;
      }

      cancelarCarga(_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.CANCELADA;
      }
      
      getCargaEspacoArmazenamento(_carga: ICargaQuimica) {
            return _carga.espacoArmazenamento;
      }
}