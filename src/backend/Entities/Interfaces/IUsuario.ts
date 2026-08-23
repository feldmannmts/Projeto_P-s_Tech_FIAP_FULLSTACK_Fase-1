export interface IUsuario {
      id: string;
      nome: string;
      email: string;
      senha: string;
}

export interface IPerfilUsuario {
      nomePerfil: string;
      descricaoPerfil: string;
      nivelAcesso: NivelAcesso;
      usuario: IUsuario;
}

export enum NivelAcesso {
      ADMINISTRADOR = "ADMINISTRADOR",
      GESTOR_OPERACIONAL = "GESTOR_OPERACIONAL",
      RESPONSAVEL_TECNICO = "RESPONSAVEL_TECNICO",
      OPERADOR_PORTUARIO = "OPERADOR_PORTUARIO",    
      INSPETOR_QUALIDADE = "INSPETOR_QUALIDADE",
}