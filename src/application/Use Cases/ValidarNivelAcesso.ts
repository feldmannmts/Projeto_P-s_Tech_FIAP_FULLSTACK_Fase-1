import { IPerfilUsuario } from "../../domain/Entities/Domain Interfaces/IUsuario";

export class ValidarNivelAcesso {

      public executar(_usuario: IPerfilUsuario, nivelAcesso: IPerfilUsuario['nivelAcesso']): boolean {
                  if (_usuario.nivelAcesso <= nivelAcesso) {
                        return true;
                  }else
                        return false;
      }
}