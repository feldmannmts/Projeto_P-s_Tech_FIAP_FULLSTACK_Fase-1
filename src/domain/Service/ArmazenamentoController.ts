import {AreaArmazenamento, SetorArmazenamento, EspacoArmazenamento} from "../Entities/AreaArmazenamento";
import {ICargaQuimica} from "../Entities/Domain Interfaces/ICargaQuimica";

class ArmazenamentoController {
      areaArmazenamento!: AreaArmazenamento;

      constructor(_areaArmazenamento: AreaArmazenamento) {
            this.areaArmazenamento = _areaArmazenamento;
      }


      //SETORES
      adicionarSetor(_setor: SetorArmazenamento): void {
            this.areaArmazenamento.listaDeSetores.push(_setor);
      }

      removerSetor(_setor: SetorArmazenamento): void {
            this.areaArmazenamento.listaDeSetores = this.areaArmazenamento.listaDeSetores.filter(s => s !== _setor);
      }

      alterarSetor(_setor: SetorArmazenamento, novoNome: string, novaDescricao: string): void {
            const setorIndex = this.areaArmazenamento.listaDeSetores.findIndex(index => index.id === _setor.id);
            if (setorIndex !== -1) {
                  this.areaArmazenamento.listaDeSetores[setorIndex].nome = novoNome;
                  this.areaArmazenamento.listaDeSetores[setorIndex].descricao = novaDescricao;
            }
      }

      //ESPAÇOS DE ARMAZENAMENTO
      adicionarEspacoArmazenamento(_setor: SetorArmazenamento, _espaco: EspacoArmazenamento): void {
            const setorIndex = this.areaArmazenamento.listaDeSetores.findIndex(index => index.id === _setor.id);
            if (setorIndex !== -1) {
                  this.areaArmazenamento.listaDeSetores[setorIndex].listaEspacoArmazenamento.push(_espaco);
            }
      }

      removerEspacoArmazenamento(_setor: SetorArmazenamento, _espaco: EspacoArmazenamento): void {
            const setorIndex = this.areaArmazenamento.listaDeSetores.findIndex(index => index.id === _setor.id);
            if (setorIndex !== -1) {
                  this.areaArmazenamento.listaDeSetores[setorIndex].listaEspacoArmazenamento = this.areaArmazenamento.listaDeSetores[setorIndex].listaEspacoArmazenamento.filter(e => e !== _espaco);
            }
      }

      alterarEspacoArmazenamento(_setor: SetorArmazenamento, _espaco: EspacoArmazenamento, novoNome: string): void {
            const setorIndex = this.areaArmazenamento.listaDeSetores.findIndex(index => index.id === _setor.id);
            if (setorIndex !== -1) {
                  const espacoIndex = this.areaArmazenamento.listaDeSetores[setorIndex].listaEspacoArmazenamento.findIndex(index => index.id === _espaco.id);
                  if (espacoIndex !== -1) {
                        this.areaArmazenamento.listaDeSetores[setorIndex].listaEspacoArmazenamento[espacoIndex].nome = novoNome;
                  }
            }
      }
}