import {IPerfilUsuario, IUsuario, enumNivelAcesso} from "./Interfaces/IUsuario";

class Usuario implements IUsuario {
      id = '';
      nome = '';
      email = '';
      senha = '';

      constructor(_id: string, _nome: string, _email: string, _senha: string, _perfilUsuario: IPerfilUsuario) {
            this.id = _id;
            this.nome = _nome;
            this.email = _email;
            this.senha = _senha;
      }
}


class Administrador implements IPerfilUsuario {
      nomePerfil = 'Administrador';
      descricaoPerfil = 'Administrador do Sistema';
      nivelAcesso = enumNivelAcesso.ADMINISTRADOR;
      usuario = {} as IUsuario;

      constructor( _usuario: IUsuario) {
            this.usuario = _usuario;
      }
}

class GestorOperacional implements IPerfilUsuario {
      nomePerfil = 'Gestor Operacional';
      descricaoPerfil = 'Gestor Operacional do Sistema';
      nivelAcesso = enumNivelAcesso.GESTOR_OPERACIONAL;
      usuario = {} as IUsuario;

      constructor( _usuario: IUsuario) {
            this.usuario = _usuario;
      }
}

class ResponsavelTecnico implements IPerfilUsuario {
      nomePerfil = 'Responsável Técnico';
      descricaoPerfil = 'Responsável Técnico da Carga Química';
      nivelAcesso = enumNivelAcesso.RESPONSAVEL_TECNICO;
      usuario = {} as IUsuario;

      constructor(_usuario: IUsuario) {
            this.usuario = _usuario;
      }
}

class InspetorQualidade implements IPerfilUsuario {
      nomePerfil = 'Inspetor de Qualidade';
      descricaoPerfil = 'Inspetor de Qualidade do Sistema';
      nivelAcesso = enumNivelAcesso.INSPETOR_QUALIDADE;
      usuario = {} as IUsuario;

      constructor(_usuario: IUsuario) {
            this.usuario = _usuario;
      }
}

class OperadorPortuario implements IPerfilUsuario {
      nomePerfil = 'Operador Portuário';
      descricaoPerfil = 'Operador Portuário do Sistema';
      nivelAcesso = enumNivelAcesso.OPERADOR_PORTUARIO;
      usuario = {} as IUsuario;

      constructor(_usuario: IUsuario) {
            this.usuario = _usuario;
      }
}
