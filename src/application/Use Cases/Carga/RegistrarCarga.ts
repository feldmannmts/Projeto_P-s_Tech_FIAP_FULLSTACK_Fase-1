import { IUsuario } from "../../../domain/Entities/Domain Interfaces/IUsuario";
import { enumNivelAcesso } from "../../../domain/enums/enumNivelAcesso";
//import { EspacoArmazenamento } from "../../../domain/Entities/AreaArmazenamento";
import { CargaQuimica } from "../../../domain/Entities/CargaQuimica";
import { ValidarNivelAcesso } from "../ValidarNivelAcesso";
import { RegistrarCargaDTO } from "../../DTO/cargaDTO";
import { ICargaRepository } from "../../Ports/Repositories/RepositorieCarga";
import { IProdutoRepository } from "../../Ports/Repositories/RepositorieProduto";
export class RegistrarCarga {
      private validarNivelAcesso: ValidarNivelAcesso = new ValidarNivelAcesso();
      constructor(
            private _cargaRepositorie: ICargaRepository,
            private _produtoRepositorie: IProdutoRepository
      ) {}
      public async executar(_usuario: IUsuario, _novaCargaDTO: RegistrarCargaDTO): Promise<CargaQuimica> {
            if (!this.validarNivelAcesso.executar(_usuario.perfilUsuario, enumNivelAcesso.OPERADOR_PORTUARIO)) {
                  throw new Error("Usuário não possui permissão para registrar carga.");
            }
            if (!_novaCargaDTO.quantidade || _novaCargaDTO.quantidade <= 0) {
                  throw new Error("A quantidade da carga deve ser maior que zero.");
            }
            const produto = await this._produtoRepositorie.buscarPorId(_novaCargaDTO.produtoId);
            if (!produto) {
                  throw new Error("Produto químico associado não encontrado.");
            }
            const novaCarga = new CargaQuimica(
                  Date.now().toString(),
                  _novaCargaDTO.codigoCarga,
                  _usuario,
                  _novaCargaDTO.origemCarga,
                  _novaCargaDTO.destinoCarga,
                  produto
            );
            await this._cargaRepositorie.salvar(novaCarga);
            return novaCarga;
      }
}