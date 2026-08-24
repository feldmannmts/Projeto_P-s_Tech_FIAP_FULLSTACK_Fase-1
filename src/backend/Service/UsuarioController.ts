import { IUsuario, IPerfilUsuario, enumNivelAcesso } from "../Entities/Domain Interfaces/IUsuario";

class UsuariosController {
      listaPerfisCadastrados!: IPerfilUsuario[];


      cadastrarNovoUsuario(_id: string, _nome: string, _email: string, _senha: string, _perfilUsuario: IPerfilUsuario): void {
            const novoUsuario: IPerfilUsuario = {
                  ..._perfilUsuario,
                  usuario: {
                        ..._perfilUsuario.usuario,
                        id: _id,
                        nome: _nome,
                        email: _email,
                        senha: _senha,
                  } as IUsuario,
            };
            this.listaPerfisCadastrados.push(novoUsuario);
      }

      removerUsuario(_usuario: IPerfilUsuario): void {
            this.listaPerfisCadastrados = this.listaPerfisCadastrados.filter(u => u !== _usuario);
      }

      alterarNivelAcesso(_perfilUsuario: IPerfilUsuario, novoCargo: enumNivelAcesso): void {
            const usuarioIndex = this.listaPerfisCadastrados.findIndex(index => index.usuario.id === _perfilUsuario.usuario.id);
            if (usuarioIndex !== -1) {
                  this.listaPerfisCadastrados[usuarioIndex].nivelAcesso = novoCargo;
            }
      }
}