export interface IUsuario {
      id: string;
      nome: string;
      email: string;
      senha: string;
}

export interface IPerfilUsuario {
      nomePerfil: string;
      descricaoPerfil: string;
      nivelAcesso: string;
      usuario: IUsuario;
}