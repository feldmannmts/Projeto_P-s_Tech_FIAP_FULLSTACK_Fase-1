import { ICargaQuimica } from "./Domain Interfaces/ICargaQuimica";

export class AreaArmazenamento{
      listaDeSetores: SetorArmazenamento[] = [];
      constructor(_listaDeSetores: SetorArmazenamento[]) {
            this.listaDeSetores = _listaDeSetores;
      }
}

export class SetorArmazenamento{
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

export class EspacoArmazenamento{
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

      alterarStatusOcupado(): void {
            this.statusOcupado = this.statusOcupado ? false : true;
      }

      armazenarCarga(carga: ICargaQuimica): void {
            if (!this.statusOcupado) {
                  this.CargaArmazenada = carga;
                  this.statusOcupado = true;
            }
      }

      removerCarga(): void {
            if (this.statusOcupado) {
                  this.CargaArmazenada = undefined;
                  this.statusOcupado = false;
            }
      }
}
