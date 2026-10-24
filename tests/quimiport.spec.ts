// tests/quimiport.spec.ts
import { beforeEach, describe, expect, test } from "@jest/globals";
import { ProdutoRepositoryMemoria, CargaQuimicaRepositoryMemoria } from "../src/adapters/repositories/RepositorieMemoria";
import { CadastrarProduto } from "../src/application/Use Cases/Produto/CadastrarProduto";
import { InativarProduto } from "../src/application/Use Cases/Produto/InativarProduto";
import { RegistrarCarga } from "../src/application/Use Cases/Carga/RegistrarCarga";
import { AtualizarStatusCarga } from "../src/application/Use Cases/Carga/AtualizarStatusCarga";
import { LiberarCarga } from "../src/application/Use Cases/Carga/LiberarCarga";
import { BloquearCarga } from "../src/application/Use Cases/Carga/BloquearCarga";
import { CancelarCarga } from "../src/application/Use Cases/Carga/CancelarCarga";
import { ValidarDocumentacao } from "../src/application/Use Cases/Carga/ValidarDocumentacao";
import { enumClasseRisco } from "../src/domain/enums/enumClasseRisco";
import { enumNivelAcesso } from "../src/domain/enums/enumNivelAcesso";
import { enumStatusCarga } from "../src/domain/enums/enumStatusCarga";

describe("QuimiPort - Iniciando Rodada de Testes", () => {
      let produtoRepo: ProdutoRepositoryMemoria;
      let cargaRepo: CargaQuimicaRepositoryMemoria;

      // Caso de Uso instanciados com banco em memória
      let cadastrarProdutoUC: CadastrarProduto;
      let inativarProdutoUC: InativarProduto;
      let registrarCargaUC: RegistrarCarga;
      let atualizarStatusUC: AtualizarStatusCarga;
      let liberarCargaUC: LiberarCarga;
      let bloquearCargaUC: BloquearCarga;
      let cancelarCargaUC: CancelarCarga;
      let validarDocUC: ValidarDocumentacao;

      // Usuário Mock com permissão máxima para testar as regras de domínio
      const usuarioMock: any = {
            id: "user-admin",
            nome: "Responsável Técnico / Admin",
            email: "admin@quimiport.com",
            nivelAcesso: enumNivelAcesso.ADMINISTRADOR,
            perfilUsuario: {
                  nomePerfil: "Admin",
                  descricaoPerfil: "Acesso total",
                  nivelAcesso: enumNivelAcesso.ADMINISTRADOR,
            },
      };

      beforeEach(() => {
            produtoRepo = new ProdutoRepositoryMemoria();
            cargaRepo = new CargaQuimicaRepositoryMemoria();

            cadastrarProdutoUC = new CadastrarProduto(produtoRepo);
            inativarProdutoUC = new InativarProduto(produtoRepo);
            registrarCargaUC = new RegistrarCarga(cargaRepo, produtoRepo);
            atualizarStatusUC = new AtualizarStatusCarga(cargaRepo);
            liberarCargaUC = new LiberarCarga(cargaRepo);
            bloquearCargaUC = new BloquearCarga(cargaRepo);
            cancelarCargaUC = new CancelarCarga(cargaRepo);
            validarDocUC = new ValidarDocumentacao(cargaRepo);
      });

      // 1. Cadastro de produto químico
      test("1. Deve cadastrar um produto químico válido com sucesso", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Ácido Sulfúrico",
                        descricao: "Ácido corrosivo concentrado",
                        codigoONU: "ONU-1830",
                        classeRisco: enumClasseRisco.CLASSE_8,
                        grupoCompatibilidade: "B",
                  },
                  usuarioMock
            );

            expect(produto.id).toBeDefined();
            expect(produto.nome).toBe("Ácido Sulfúrico");
            expect(produto.statusAtivo).toBe(true);
      });

      // 2. Bloqueio de cadastro de produto químico sem nome
      test("2. Deve bloquear o cadastro de produto químico sem nome", async () => {
            await expect(
                  cadastrarProdutoUC.executar(
                        {
                              nome: "",
                              descricao: "Sem nome",
                              codigoONU: "ONU-0000",
                              classeRisco: enumClasseRisco.CLASSE_3,
                              grupoCompatibilidade: "A",
                        },
                        usuarioMock
                  )
            ).rejects.toThrow();
      });

      // 3. Bloqueio de cadastro de produto químico sem classe de risco
      test("3. Deve bloquear o cadastro de produto químico sem classe de risco", async () => {
            await expect(
                  cadastrarProdutoUC.executar(
                        {
                              nome: "Produto Sem Risco",
                              descricao: "Teste",
                              codigoONU: "ONU-1111",
                              classeRisco: "" as any,
                              grupoCompatibilidade: "A",
                        },
                        usuarioMock
                  )
            ).rejects.toThrow();
      });

      // 4. Registro de carga química
      test("4. Deve registrar uma carga química válida com status inicial REGISTRADA", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Metanol",
                        descricao: "Líquido inflamável",
                        codigoONU: "ONU-1230",
                        classeRisco: enumClasseRisco.CLASSE_3,
                        grupoCompatibilidade: "C",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-001",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Porto de Houston",
                  destinoCarga: "Porto de Santos",
                  quantidade: 100,
                  unidadeMedida: "Toneladas",
            });

            expect(carga.id).toBeDefined();
            expect(carga.status).toBe(enumStatusCarga.REGISTRADA);
            expect(carga.listaProduto[0].id).toBe(produto.id);
      });

      // 5. Bloqueio de carga com produto químico inativo
      test("5. Deve bloquear o registro de carga com produto químico inativo", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Benzeno",
                        descricao: "Inativo",
                        codigoONU: "ONU-1114",
                        classeRisco: enumClasseRisco.CLASSE_3,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            await inativarProdutoUC.executar(usuarioMock, produto.id);

            await expect(
                  registrarCargaUC.executar(usuarioMock, {
                        codigoCarga: "CARGA-INATIVA",
                        produtoId: produto.id,
                        responsavelTecnicoId: usuarioMock.id,
                        origemCarga: "Origem",
                        destinoCarga: "Destino",
                        quantidade: 50,
                        unidadeMedida: "Toneladas",
                  })
            ).rejects.toThrow("Produto químico não está ativo ou não foi informado.");
      });

      // 6. Bloqueio de carga com quantidade menor ou igual a zero
      test("6. Deve bloquear o registro de carga com quantidade menor ou igual a zero", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Cloro",
                        descricao: "Gás tóxico",
                        codigoONU: "ONU-1017",
                        classeRisco: enumClasseRisco.CLASSE_2,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            await expect(
                  registrarCargaUC.executar(usuarioMock, {
                        codigoCarga: "CARGA-ZERO",
                        produtoId: produto.id,
                        responsavelTecnicoId: usuarioMock.id,
                        origemCarga: "Origem",
                        destinoCarga: "Destino",
                        quantidade: 0,
                        unidadeMedida: "Kg",
                  })
            ).rejects.toThrow("A quantidade da carga deve ser maior que zero.");
      });

      // 7. Bloqueio de liberação de carga sem documentação obrigatória
      test("7. Deve bloquear a liberação de carga sem documentação obrigatória validada", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Amônia",
                        descricao: "Gás",
                        codigoONU: "ONU-1005",
                        classeRisco: enumClasseRisco.CLASSE_2,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-SEM-DOC",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Origem",
                  destinoCarga: "Destino",
                  quantidade: 20,
                  unidadeMedida: "Toneladas",
            });

            // Mesmo avançando para EM_ANALISE e EM_INSPECAO, não tem documentos validados
            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_ANALISE, { novoStatus: enumStatusCarga.EM_ANALISE });
            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_INSPECAO, { novoStatus: enumStatusCarga.EM_INSPECAO });

            await expect(
                  liberarCargaUC.executar(carga.id, usuarioMock, { novoStatus: enumStatusCarga.LIBERADA })
            ).rejects.toThrow("Documentação obrigatória não está completamente validada.");
      });

      // 8. Atualização de status da carga
      test("8. Deve atualizar o status da carga de REGISTRADA para EM_ANALISE", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Peróxido de Hidrogênio",
                        descricao: "Oxidante",
                        codigoONU: "ONU-2015",
                        classeRisco: enumClasseRisco.CLASSE_5,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-STATUS",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Origem",
                  destinoCarga: "Destino",
                  quantidade: 15,
                  unidadeMedida: "Toneladas",
            });

            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_ANALISE, {
                  novoStatus: enumStatusCarga.EM_ANALISE,
            });

            const cargaAtualizada = await cargaRepo.buscarPorId(carga.id);
            expect(cargaAtualizada?.status).toBe(enumStatusCarga.EM_ANALISE);
      });

      // 9. Validação das transições permitidas de status (Fluxo completo)
      test("9. Deve permitir o fluxo completo: REGISTRADA -> EM_ANALISE -> EM_INSPECAO -> LIBERADA -> EM_MOVIMENTO -> FINALIZADA", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Soda Cáustica",
                        descricao: "Corrosivo",
                        codigoONU: "ONU-1824",
                        classeRisco: enumClasseRisco.CLASSE_8,
                        grupoCompatibilidade: "B",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-FLUXO-COMPLETO",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Origem",
                  destinoCarga: "Destino",
                  quantidade: 80,
                  unidadeMedida: "Toneladas",
            });

            // Adiciona um documento e valida
            carga.listaDocumentosCarga.push({
                  id: "doc-1",
                  nome: "FISPQ",
                  descricao: "Ficha de Segurança",
                  validado: false,
                  setArquivo: () => {},
                  getArquivo: () => "",
            });
            await validarDocUC.executar(carga.id, usuarioMock, "doc-1");

            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_ANALISE, { novoStatus: enumStatusCarga.EM_ANALISE });
            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_INSPECAO, { novoStatus: enumStatusCarga.EM_INSPECAO });
            await liberarCargaUC.executar(carga.id, usuarioMock, { novoStatus: enumStatusCarga.LIBERADA });
            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_MOVIMENTO, { novoStatus: enumStatusCarga.EM_MOVIMENTO });
            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.FINALIZADA, { novoStatus: enumStatusCarga.FINALIZADA });

            const cargaFinal = await cargaRepo.buscarPorId(carga.id);
            expect(cargaFinal?.status).toBe(enumStatusCarga.FINALIZADA);
      });

      // 10. Bloqueio das transições proibidas de status
      test("10. Deve bloquear transições proibidas (ex: REGISTRADA direto para FINALIZADA)", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Etanol",
                        descricao: "Inflamável",
                        codigoONU: "ONU-1170",
                        classeRisco: enumClasseRisco.CLASSE_3,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-PROIBIDA",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Origem",
                  destinoCarga: "Destino",
                  quantidade: 30,
                  unidadeMedida: "Toneladas",
            });

            await expect(
                  atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.FINALIZADA, {
                        novoStatus: enumStatusCarga.FINALIZADA,
                  })
            ).rejects.toThrow("Transição de status não permitida.");
      });

      // 11. Cancelamento de carga
      test("11. Deve cancelar uma carga e impedir qualquer alteração posterior (estado terminal)", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Tolueno",
                        descricao: "Solvente",
                        codigoONU: "ONU-1294",
                        classeRisco: enumClasseRisco.CLASSE_3,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-CANCELAR",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Origem",
                  destinoCarga: "Destino",
                  quantidade: 40,
                  unidadeMedida: "Toneladas",
            });

            await cancelarCargaUC.executar(carga.id, usuarioMock, "Cancelada pelo cliente", {
                  novoStatus: enumStatusCarga.CANCELADA,
                  motivo: "Cancelada pelo cliente",
            });

            const cargaCancelada = await cargaRepo.buscarPorId(carga.id);
            expect(cargaCancelada?.status).toBe(enumStatusCarga.CANCELADA);

            // Tentar alterar após cancelada deve falhar
            await expect(
                  atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_ANALISE, {
                        novoStatus: enumStatusCarga.EM_ANALISE,
                  })
            ).rejects.toThrow();
      });

      // 12. Tentativa de movimentar carga bloqueada
      test("12. Deve impedir que uma carga BLOQUEADA entre em movimentação", async () => {
            const produto = await cadastrarProdutoUC.executar(
                  {
                        nome: "Nitrato de Amônio",
                        descricao: "Oxidante",
                        codigoONU: "ONU-1942",
                        classeRisco: enumClasseRisco.CLASSE_5,
                        grupoCompatibilidade: "A",
                  },
                  usuarioMock
            );

            const carga = await registrarCargaUC.executar(usuarioMock, {
                  codigoCarga: "CARGA-BLOQUEADA",
                  produtoId: produto.id,
                  responsavelTecnicoId: usuarioMock.id,
                  origemCarga: "Origem",
                  destinoCarga: "Destino",
                  quantidade: 60,
                  unidadeMedida: "Toneladas",
            });

            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_ANALISE, { novoStatus: enumStatusCarga.EM_ANALISE });
            await atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_INSPECAO, { novoStatus: enumStatusCarga.EM_INSPECAO });

            // Bloqueia na inspeção
            await bloquearCargaUC.executar(carga.id, usuarioMock, "Avaria na embalagem", {
                  novoStatus: enumStatusCarga.BLOQUEADA,
                  motivo: "Avaria na embalagem",
            });

            // Tenta colocar em movimentação
            await expect(
                  atualizarStatusUC.executar(carga.id, usuarioMock, enumStatusCarga.EM_MOVIMENTO, {
                        novoStatus: enumStatusCarga.EM_MOVIMENTO,
                  })
            ).rejects.toThrow("Transição de status não permitida.");
      });
});