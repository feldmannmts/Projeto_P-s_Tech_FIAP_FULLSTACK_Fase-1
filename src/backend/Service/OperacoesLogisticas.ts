import { IHistoricoCarga } from "../Entities/Aggregate Interfaces/IHistoricoCarga";
import { ICargaQuimica, enumStatusCarga } from "../Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../Entities/Domain Interfaces/IProdutoQuimico";
import { IUsuario } from "../Entities/Domain Interfaces/IUsuario";
import { CargaQuimica } from "../Entities/CargaQuimica";
import { EspacoArmazenamento } from "../Entities/AreaArmazenamento";
import { IVeiculo } from "../Entities/Aggregate Interfaces/IVeiculo";

class OperacoesLogisticas {

      ReceberCarga (_id: string, _responsavelTecnico: IUsuario, _espacoArmazenamento: EspacoArmazenamento): ICargaQuimica {
            return new CargaQuimica(_id, _responsavelTecnico, _espacoArmazenamento);
      }

      ArmazenarCarga (_carga: ICargaQuimica, _espacoArmazenamento: EspacoArmazenamento): void {
            if (!_espacoArmazenamento.statusOcupado) {
                  _espacoArmazenamento.armazenarCarga(_carga);
                  _carga.espacoArmazenamento = _espacoArmazenamento;
            }
      }

      RemoverCarga (_carga: ICargaQuimica): void {
            if (_carga.espacoArmazenamento.statusOcupado) {
                  _carga.espacoArmazenamento.removerCarga();
                  _carga.espacoArmazenamento = {} as EspacoArmazenamento;
            }
      }

      MoverCarga (_carga: ICargaQuimica, _novoEspacoArmazenamento: EspacoArmazenamento): void {
            if (_carga.espacoArmazenamento.statusOcupado) {
                  _carga.espacoArmazenamento.removerCarga();
                  _carga.espacoArmazenamento = _novoEspacoArmazenamento;
                  _novoEspacoArmazenamento.armazenarCarga(_carga);
            }
      }

      InspecionarCarga (_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.EM_INSPECAO;
      }

      DetetizarCarga (_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.EM_INSPECAO;
      }

      AutorizarCarga (_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.LIBERADA;
      }

      OrganizarCarga (_carga: ICargaQuimica): void {
            _carga.status = enumStatusCarga.FINALIZADA;
      }

      CarregarCarga (_carga: ICargaQuimica, _veiculo:IVeiculo): void {
            _carga.status = enumStatusCarga.EM_MOVIMENTO;
      }

      FinalizarCarga (_carga: ICargaQuimica, _veiculo:IVeiculo): void {
            _carga.status = enumStatusCarga.FINALIZADA;
      }

      
}