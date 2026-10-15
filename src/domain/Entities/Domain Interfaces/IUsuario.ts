import { enumNivelAcesso } from "../../enums/enumNivelAcesso";

export interface IUsuario {
      id: string;
      nome: string;
      email: string;
      senha: string;
      perfilUsuario: IPerfilUsuario;
}

export interface IPerfilUsuario {
      nomePerfil: string;
      descricaoPerfil: string;
      nivelAcesso: enumNivelAcesso;
      usuario: IUsuario;
}