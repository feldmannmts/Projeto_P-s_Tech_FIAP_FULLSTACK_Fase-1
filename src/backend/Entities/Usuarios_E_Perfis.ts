import {IPerfilUsuario, IUsuario, enumNivelAcesso} from "./Domain Interfaces/IUsuario";

class UsuarioData implements IUsuario {
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


class Usuario implements IPerfilUsuario {
      nomePerfil = '';
      descricaoPerfil = '';
      nivelAcesso = enumNivelAcesso.ADMINISTRADOR;
      usuario = {} as IUsuario;

      constructor(_nomePerfil: string, _descricaoPerfil: string, _nivelAcesso: enumNivelAcesso, _usuario: IUsuario) {
            this.nomePerfil = _nomePerfil;
            this.descricaoPerfil = _descricaoPerfil;
            this.nivelAcesso = _nivelAcesso;
            this.usuario = _usuario;
      }

}