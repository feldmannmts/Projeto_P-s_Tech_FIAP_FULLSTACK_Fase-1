import { ICargaQuimica } from "../../../domain/Entities/Domain Interfaces/ICargaQuimica";
export interface ICargaRepository {
      salvar(carga: ICargaQuimica): Promise<void>;
      buscarPorId(id: string): Promise<ICargaQuimica | null>;
      listar(): Promise<ICargaQuimica[]>;
      atualizar(carga: ICargaQuimica): Promise<void>;
}