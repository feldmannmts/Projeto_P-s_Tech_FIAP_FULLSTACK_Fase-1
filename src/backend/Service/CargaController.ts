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

      atualizarStatus(_carga: ICargaQuimica, _status?: enumStatusCarga): void {
            if (_status !== undefined) {
                  _carga.status = _status;
            }
      }

      alocarCarga(_espacoArmazenamento: EspacoArmazenamento, _carga: ICargaQuimica): void {
            if (!_espacoArmazenamento.statusOcupado) {
                  _espacoArmazenamento.armazenarCarga(_carga);
                  _carga.espacoArmazenamento = _espacoArmazenamento;
            }
      }

      removerCarga(_espacoArmazenamento: EspacoArmazenamento): void {
            if (_espacoArmazenamento.statusOcupado) {
                  _espacoArmazenamento.removerCarga();
            }
      }

      getEspacoArmazenamento(_carga: ICargaQuimica) {
            return _carga.espacoArmazenamento;
      }
}