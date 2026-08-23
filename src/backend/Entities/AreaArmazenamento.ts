import { ICargaQuimica } from "./Interfaces/ICargaQuimica";

class AreaArmazenamento{
      areaArmazenamento: SetorArmazenamento[] = [];
      constructor(_areaArmazenamento: SetorArmazenamento[]) {
            this.areaArmazenamento = _areaArmazenamento;
      }
}

class SetorArmazenamento{
      id: string;
      nome: string;
      descricao: string;
      listaEspacoArmazenamento: EspacoArmazenamento[] = [];
      constructor(_id: string, _nome: string, _descricao: string) {
            this.id = _id;
            this.nome = _nome;
            this.descricao = _descricao;
      }
}

class EspacoArmazenamento{
      id: string;
      nome: string;
      statusOcupado: boolean;
      CargaArmazenada?: ICargaQuimica;
      constructor(_id: string, _nome: string, _statusOcupado: boolean) {
            this.id = _id;
            this.nome = _nome;
            this.statusOcupado = _statusOcupado;
            this.CargaArmazenada = undefined;
      }

      AlterarStatusOcupado(): void {
            this.statusOcupado = this.statusOcupado ? false : true;
      }

      ArmazenarCarga(carga: ICargaQuimica): void {
            if (!this.statusOcupado) {
                  this.CargaArmazenada = carga;
                  this.statusOcupado = true;
            }
      }

      RemoverCarga(): void {
            if (this.statusOcupado) {
                  this.CargaArmazenada = undefined;
                  this.statusOcupado = false;
            }
      }
}
