import { CadastrarProduto } from "../../application/Use Cases/Produto/CadastrarProduto";
import { InativarProduto } from "../../application/Use Cases/Produto/InativarProduto";
import { Request, Response } from "express";

export class ProdutoController{
      constructor(
            private cadastrarProdutoUseCase: CadastrarProduto,
            private inativarProdutoUseCase: InativarProduto
      ){}

      public CadastrarProduto = async (req: Request, res: Response): Promise<Response> =>{
            try{
                  const produtoDTO: CadastrarProduto = req.body;

                  if(!produtoDTO.nome || !produtoDTO.classeRisco){
                        return res.status(400).json({

                        })
                  }

                  const userMock = req.body.usuario;
                  const novoProduto = this.cadastrarProdutoUseCase.executar(
                        produtoDTO.nome,
                        produtoDTO.codigoONU,
                        produtoDTO.classeRisco,
                        true,
                        userMock
                  );
                  return res.status(201).json(novoProduto);
            }catch(error: any){
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public AtualizarProduto = async(req: Request, res: Response): Promise<Response> => {
            try {
                  const atualizarProdutoDTO: AtualizarProdutoDTO = req.body;
                  const userMock = req.body.usuario;

                  if(!atualizarProdutoDTO.id ){

                  }

                  return res.status(201).json(novoProduto);
            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }


}
