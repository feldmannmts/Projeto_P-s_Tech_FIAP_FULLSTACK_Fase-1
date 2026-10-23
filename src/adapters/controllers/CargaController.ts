import { Request, Response } from "express";
import {RegistrarCargaDTO,
      AtualizarStatusCargaDTO,
      ListarCargasOutputDTO,
      DocumentoCargaOutputDTO,
      HistoricoAtualizacaoOutputDTO,
      CargaOutputDTO  } from "../../application/DTO/cargaDTO";

import {AtualizarStatusCarga} from "../../application/Use Cases/Carga/AtualizarStatusCarga"
import { BloquearCarga } from "../../application/Use Cases/Carga/BloquearCarga";
import { CancelarCarga } from "../../application/Use Cases/Carga/CancelarCarga";
import { GetCargaId } from "../../application/Use Cases/Carga/GetCargaID";
import { LiberarCarga } from "../../application/Use Cases/Carga/LiberarCarga";
import { ListarCargas } from "../../application/Use Cases/Carga/ListarCargas";
import { RegistrarCarga } from "../../application/Use Cases/Carga/RegistrarCarga";
import { ValidarDocumentacao } from "../../application/Use Cases/Carga/ValidarDocumentacao";



export class CargaController{
      constructor(
            private atualizarStatusCargaUseCase:AtualizarStatusCarga,
            private bloquearCargaUseCase: BloquearCarga,
            private cancelarCargaUseCase: CancelarCarga,
            private getCargaIDUseCase: GetCargaId,
            private liberarCargaUseCase: LiberarCarga,
            private listarCargasUseCase: ListarCargas,
            private registrarCargaUseCase: RegistrarCarga,
            private validarDocumentacaoUseCase: ValidarDocumentacao,
      ){}

      public atualizarStatusCarga = async (req: Request, res: Response): Promise<Response> => {
            try {
                  const cargaDTO: AtualizarStatusCargaDTO = req.body
                  const usuarioMock = req.body.usuario;
                  const {id} = req.params;

                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  

                  await this.atualizarStatusCargaUseCase.executar(id ,usuarioMock,cargaDTO.novoStatus,cargaDTO)
                  return res.status(200).json(`Status da Carga de ID ${id} foi Alterado com Sucesso para ${cargaDTO.novoStatus}`)


            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public bloquearCarga = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const cargaDTO: AtualizarStatusCargaDTO = req.body
                  const usuarioMock = req.body.usuario;
                  const {id} = req.params;

                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }
                  if(!cargaDTO.motivo){
                        return res.status(400).json({ erro: "Nenhum motivo do bloqueio foi adicionado" });
                  }

                  await this.bloquearCargaUseCase.executar(id,usuarioMock,cargaDTO.motivo, cargaDTO);
                  return res.status(200).json(`Status da Carga de ID ${id} foi Alterado com Sucesso para BLOQUEADA`)

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public cancelarCarga = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const cargaDTO: AtualizarStatusCargaDTO = req.body
                  const usuarioMock = req.body.usuario;
                  const {id} = req.params;

                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }
                  if(!cargaDTO.motivo){
                        return res.status(400).json({ erro: "Nenhum motivo do cancelamento foi adicionado" });
                  }

                  await this.cancelarCargaUseCase.executar(id,usuarioMock,cargaDTO.motivo, cargaDTO);
                  return res.status(200).json(`Status da Carga de ID ${id} foi Alterado com Sucesso para CANCELADA`)

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public getCargaByID = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const {id} = req.params;
                  const usuarioMock = req.body.usuario;


                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  const carga = await this.getCargaIDUseCase.executar(id, usuarioMock);
                  return res.status(200).json(carga);
            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public liberarCarga = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const cargaDTO: AtualizarStatusCargaDTO = req.body
                  const usuarioMock = req.body.usuario;
                  const {id} = req.params;

                  if (typeof id !== "string") {
                        return res.status(400).json({ erro: "ID do produto inválido." });
                  }

                  await this.liberarCargaUseCase.executar(id,usuarioMock, cargaDTO);
                  return res.status(200).json(`Carga de ID ${id} foi Liberada com Sucesso`)

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }


      public listarCargas = async (req: Request, res: Response): Promise<Response> =>{
            try {
                  const usuarioMock = req.body.usuario;

                  const listaCargas = await this.listarCargasUseCase.executar(usuarioMock);
                  return res.status(200).json(listaCargas);

            } catch (error: any) {
                  return res.status(400).json({erro: error.message}); 
            }
      }

      public registrarCarga = async (req: Request, res: Response): Promise<Response> => {
            try {
                  const novaCargaDTO: RegistrarCargaDTO = req.body;
                  const usuario = req.body.usuario;
                  const novaCarga = await this.registrarCargaUseCase.executar(usuario, novaCargaDTO);
                  return res.status(201).json(novaCarga);
            } catch (error: any) {
                  return res.status(400).json({ erro: error.message });
            }
      };

      public validarDocumentacao = async (req: Request, res: Response): Promise<Response> => {
            try {
                  const usuarioMock = req.body.usuario;
                  const {idCarga} = req.params;
                  const {idDocumento} = req.params;

                  if (typeof idCarga !== "string" || typeof idDocumento !== "string" ) {
                        return res.status(400).json({ erro: "ID do produto ou do Documento inválido." });
                  }

                  await this.validarDocumentacaoUseCase.executar(idCarga,usuarioMock,idDocumento)
                  return res.status(200).json(`Documento ${idDocumento} da Carga de ID ${idCarga} foi Validado com Sucesso`)

            } catch (error: any) {
                  return res.status(400).json({ erro: error.message });
            }
      };
}