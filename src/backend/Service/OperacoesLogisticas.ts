import { IHistoricoCarga } from "../Entities/Aggregate Interfaces/IHistoricoCarga";
import { ICargaQuimica, enumStatusCarga } from "../Entities/Domain Interfaces/ICargaQuimica";
import { IProdutoQuimico } from "../Entities/Domain Interfaces/IProdutoQuimico";
import { enumNivelAcesso, IPerfilUsuario, IUsuario } from "../Entities/Domain Interfaces/IUsuario";
import { CargaQuimica } from "../Entities/CargaQuimica";
import { EspacoArmazenamento } from "../Entities/AreaArmazenamento";
import { IVeiculo } from "../Entities/Aggregate Interfaces/IVeiculo";

class OperacoesLogisticas {
      ValidarCargo (_usuario: IPerfilUsuario, _cargoPermitido: string): boolean {
            return _usuario.nivelAcesso === _cargoPermitido;
      }
     


      ReceberCarga (_carga: ICargaQuimica, _usuario:IPerfilUsuario , _espacoArmazenamento: EspacoArmazenamento) {
            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){

                  return new CargaQuimica(_carga.id, _usuario, _espacoArmazenamento);
            } else {  
                        //ERROR
            }
      }

      ArmazenarCarga (_carga: ICargaQuimica, _usuario:IPerfilUsuario , _espacoArmazenamento: EspacoArmazenamento): void {
            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){

                  if (!_espacoArmazenamento.statusOcupado) {
                        _espacoArmazenamento.armazenarCarga(_carga);
                        _carga.espacoArmazenamento = _espacoArmazenamento;
                  }
            } else {  
                  //ERROR
            }
      }

      RemoverCarga (_carga: ICargaQuimica, _usuario:IPerfilUsuario): void {
            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){

                if (_carga.espacoArmazenamento.statusOcupado) {
                  _carga.espacoArmazenamento.removerCarga();
                  _carga.espacoArmazenamento = {} as EspacoArmazenamento;
            }
            } else {  
                  //ERROR
            }


      }

      MoverCarga (_carga: ICargaQuimica,_usuario:IPerfilUsuario, _novoEspacoArmazenamento: EspacoArmazenamento): void {
             
            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                 if (_carga.espacoArmazenamento.statusOcupado) {
                  _carga.espacoArmazenamento.removerCarga();
                  _carga.espacoArmazenamento = _novoEspacoArmazenamento;
                  _novoEspacoArmazenamento.armazenarCarga(_carga);
            }
            } else {  
                  //ERROR
            }


      }

      InspecionarCarga (_carga: ICargaQuimica, _usuario:IPerfilUsuario): void {

            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                  _carga.status = enumStatusCarga.EM_INSPECAO;
            }else {  
                  //ERROR
            }  
      }

      DetetizarCarga (_carga: ICargaQuimica, _usuario:IPerfilUsuario): void {
            
            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                  _carga.status = enumStatusCarga.EM_INSPECAO;
            }else {  
                  //ERROR
            } 
      }

      AutorizarCarga (_carga: ICargaQuimica,  _usuario:IPerfilUsuario): void {
            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                  _carga.status = enumStatusCarga.LIBERADA;
            }else {  
                  //ERROR
            } 
      }

      OrganizarCarga (_carga: ICargaQuimica, _usuario:IPerfilUsuario): void {

            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                  _carga.status = enumStatusCarga.FINALIZADA;
            }else {  
                  //ERROR
            }
      }

      CarregarCarga (_carga: ICargaQuimica, _veiculo:IVeiculo, _usuario:IPerfilUsuario): void {

            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                  _carga.status = enumStatusCarga.EM_MOVIMENTO;
            }else {  
                  //ERROR
            }
      }

      FinalizarCarga (_carga: ICargaQuimica, _veiculo:IVeiculo, _usuario:IPerfilUsuario): void {

            if(this.ValidarCargo(_usuario, enumNivelAcesso.OPERADOR_PORTUARIO)){
                  _carga.status = enumStatusCarga.FINALIZADA;
            }else {  
                  //ERROR
            }
      }

      
}