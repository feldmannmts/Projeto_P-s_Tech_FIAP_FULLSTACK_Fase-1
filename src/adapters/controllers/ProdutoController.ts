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

                  const novoProduto = await this.cadastrarProdutoUseCase.executar(produtoDTO,usuarioMock);
                  return res.status(201).json(novoProduto);
            }catch(error: any){
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public atualizarProduto = async(req: Request, res: Response): Promise<Response> => {
            try {
                  const {id} = req.params;
                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  const produtoDTO: AtualizarProdutoInputDTO = req.body;
                  const userMock = req.body.usuario;
                  const novoProduto = await this.atualizarProdutoUseCase.executar(userMock, id, produtoDTO)
                  
                  return res.status(200).json(novoProduto);
            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public listarProdutos = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const userMock = req.body.usuario;
                  const listaProdutos = await this.listarProdutosUseCase.executar(userMock);
                  return res.status(201).json(listaProdutos);
            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 

            }
      }

      public buscarProdutoPorID = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const {id} = req.params;
                  const userMock = req.body.usuario;

                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  const produto = await this.buscarProdutoPorIdUseCase.executar(userMock, id);
                  return res.status(200).json(produto);
            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public inativarProduto = async (req: Request, res: Response): Promise<Response> =>{
            
            try {
                  const {id} = req.params;
                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  const userMock = req.body.usuario;

                  await this.inativarProdutoUseCase.executar(userMock, id)
                  return res.status(200).json(`Produto com a ID ${id} foi Inativado`);

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }


}
