import { EspacoArmazenamento } from "../../domain/Entities/AreaArmazenamento";
import { ICargaQuimica } from "../../domain/Entities/Domain Interfaces/ICargaQuimica";
import { enumStatusCarga } from "../../domain/enums/enumStatusCarga";
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