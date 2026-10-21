import { CadastrarProduto } from "../../application/Use Cases/Produto/CadastrarProduto";
import { InativarProduto } from "../../application/Use Cases/Produto/InativarProduto";
import { Request, Response } from "express";
import { ListarProdutos } from "../../application/Use Cases/Produto/ListarProdutos";
import { BuscarProdutoPorID } from "../../application/Use Cases/Produto/BuscarProdutoPorID";
import { AtualizarProduto } from "../../application/Use Cases/Produto/AtualizarProduto";
import { AtualizarProdutoInputDTO, CadastrarProdutoInputDTO} from "../../application/DTO/produtoDTO";

export class ProdutoController{
      constructor(
            private cadastrarProdutoUseCase: CadastrarProduto,
            private listarProdutosUseCase: ListarProdutos,
            private buscarProdutoPorIdUseCase: BuscarProdutoPorID,
            private atualizarProdutoUseCase:AtualizarProduto,
            private inativarProdutoUseCase: InativarProduto,


      ){}

      public cadastrarProduto = async (req: Request, res: Response): Promise<Response> =>{
            try{
                  const produtoDTO: CadastrarProdutoInputDTO = req.body;
                  const usuarioMock = req.body.usuario;

                  if(!produtoDTO.nome || !produtoDTO.classeRisco){
                        return res.status(400).json({ erro: "Nome e Classe de Risco são obrigatórios." })
                  }

                  const novoProduto = await this.cadastrarProdutoUseCase.executar(
                        produtoDTO.nome,
                        produtoDTO.codigoONU,
                        produtoDTO.classeRisco,
                        true,
                        usuarioMock
                  );
                  return res.status(201).json(novoProduto);
            }catch(error: any){
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public atualizarProduto = async(req: Request, res: Response): Promise<Response> => {
            try {
                  const {_id} = req.params;
                  if (typeof _id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  const produtoDTO: AtualizarProdutoInputDTO = req.body;
                  const userMock = req.body.usuario;
                  const novoProduto = await this.atualizarProdutoUseCase.executar(userMock, _id, produtoDTO)
                  
                  return res.status(201).json(novoProduto);
            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public listarProdutos = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const userMock = req.body.usuario;
                  return res.status(201).json(this.listarProdutosUseCase.executar(userMock));

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 

            }
      }

      public buscarProdutoPorID = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const {_id} = req.params;
                  const userMock = req.body.usuario;

                  if (typeof _id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  return res.status(201).json(this.buscarProdutoPorIdUseCase.executar(userMock,_id));

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public inativarProduto = async (req: Request, res: Response): Promise<Response> =>{
            
            try {
                  const {_id} = req.body;
                  const userMock = req.body.usuario;

                  this.inativarProdutoUseCase.executar(userMock, _id )
                  return res.status(201).json(`Produto com a ID ${_id} foi Inativado`);

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }


}
