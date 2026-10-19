import { enumClasseRisco } from "../../enums/enumClasseRisco";
import { IHistorico } from "../Aggregate Interfaces/IHistorico";
export interface IProdutoQuimico{
      id: string;
      nome: string;
      descricao: string;
      codigoONU: string;
      classeRisco: enumClasseRisco;
      grupoCompatibilidade: string;
      statusAtivo: boolean;
      historicoAtualizacoes: IHistorico;

}

