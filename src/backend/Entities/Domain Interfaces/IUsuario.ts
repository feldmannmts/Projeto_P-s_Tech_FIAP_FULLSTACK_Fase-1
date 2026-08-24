export interface IUsuario {
      id: string;
      nome: string;
      email: string;
      senha: string;
}

export interface IPerfilUsuario {
      nomePerfil: string;
      descricaoPerfil: string;
      nivelAcesso: enumNivelAcesso;
      usuario: IUsuario;
}

export enum enumNivelAcesso {
      ADMINISTRADOR = "ADMINISTRADOR",
      GESTOR_OPERACIONAL = "GESTOR_OPERACIONAL",
      RESPONSAVEL_TECNICO = "RESPONSAVEL_TECNICO",
      INSPETOR_QUALIDADE = "INSPETOR_QUALIDADE",
      OPERADOR_PORTUARIO = "OPERADOR_PORTUARIO",    
}