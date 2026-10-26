// src/infrastructure/http/swagger.ts
export const swaggerDocument = {
      openapi: "3.0.0",
      info: {
            title: "QuimiPort API — Gestão de Cargas Químicas Portuárias",
            version: "1.0.0",
            description:
                  "API REST para controle e rastreabilidade de produtos químicos e cargas portuárias (Tech Challenge FIAP — Fase 2).",
      },
      servers: [
            {
                  url: "http://localhost:35500",
                  description: "Servidor Local / Docker",
            },
      ],
      paths: {
            "/produtos-quimicos": {
                  post: {
                        tags: ["1. Produtos Químicos"],
                        summary: "Cadastrar um novo produto químico",
                        description:
                              "Regras aplicadas: 1) Um produto não pode ser cadastrado sem nome; 2) Não pode ser cadastrado sem classe de risco válida; 3) Todo produto nasce com statusAtivo = true.",
                        requestBody: {
                              required: true,
                              content: {
                                    "application/json": {
                                          example: {
                                                nome: "Ácido Sulfúrico",
                                                descricao: "Ácido forte corrosivo de uso industrial",
                                                codigoONU: "ONU-1830",
                                                classeRisco: "CLASSE_8 - Corrossivos",
                                                grupoCompatibilidade: "Grupo B",
                                          },
                                    },
                              },
                        },
                        responses: {
                              201: {
                                    description: "Produto químico criado com sucesso",
                                    content: {
                                          "application/json": {
                                                example: {
                                                      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                                                      nome: "Ácido Sulfúrico",
                                                      descricao: "Ácido forte corrosivo de uso industrial",
                                                      codigoONU: "ONU-1830",
                                                      classeRisco: "CLASSE_8 - Corrossivos",
                                                      grupoCompatibilidade: "Grupo B",
                                                      statusAtivo: true,
                                                      historicoAtualizacoes: { listaAtualizacoes: [] },
                                                },
                                          },
                                    },
                              },
                              400: {
                                    description: "Erro de validação ou regra de negócio violada",
                                    content: {
                                          "application/json": {
                                                example: { erro: "Nome e Classe de Risco são obrigatórios." },
                                          },
                                    },
                              },
                        },
                  },
                  get: {
                        tags: ["1. Produtos Químicos"],
                        summary: "Listar todos os produtos químicos cadastrados",
                        description: "Retorna a lista completa de produtos químicos ativos e inativos.",
                        responses: {
                              200: {
                                    description: "Lista de produtos químicos",
                                    content: {
                                          "application/json": {
                                                example: [
                                                      {
                                                            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                                                            nome: "Ácido Sulfúrico",
                                                            codigoONU: "ONU-1830",
                                                            classeRisco: "CLASSE_8 - Corrossivos",
                                                            statusAtivo: true,
                                                      },
                                                ],
                                          },
                                    },
                              },
                        },
                  },
            },
            "/produtos-quimicos/{id}": {
                  get: {
                        tags: ["1. Produtos Químicos"],
                        summary: "Buscar produto químico por identificador (ID)",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID único do produto químico",
                                    schema: { type: "string" },
                              },
                        ],
                        responses: {
                              200: {
                                    description: "Produto encontrado",
                                    content: {
                                          "application/json": {
                                                example: {
                                                      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                                                      nome: "Ácido Sulfúrico",
                                                      codigoONU: "ONU-1830",
                                                      classeRisco: "CLASSE_8 - Corrossivos",
                                                      statusAtivo: true,
                                                },
                                          },
                                    },
                              },
                              400: {
                                    description: "Produto não encontrado",
                                    content: {
                                          "application/json": {
                                                example: { erro: "Produto não encontrado." },
                                          },
                                    },
                              },
                        },
                  },
                  put: {
                        tags: ["1. Produtos Químicos"],
                        summary: "Atualizar dados de um produto químico",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID do produto químico a ser atualizado",
                                    schema: { type: "string" },
                              },
                        ],
                        requestBody: {
                              required: true,
                              content: {
                                    "application/json": {
                                          example: {
                                                nome: "Ácido Sulfúrico Concentrado 98%",
                                                descricao: "Descrição atualizada",
                                                codigoONU: "ONU-1830",
                                                classeRisco: "CLASSE_8 - Corrossivos",
                                                grupoCompatibilidade: "Grupo B",
                                          },
                                    },
                              },
                        },
                        responses: {
                              200: { description: "Produto atualizado com sucesso" },
                              400: { description: "Produto não encontrado ou sem permissão" },
                        },
                  },
            },
            "/produtos-quimicos/{id}/inativar": {
                  patch: {
                        tags: ["1. Produtos Químicos"],
                        summary: "Inativar logicamente um produto químico",
                        description:
                              "Regra aplicada: Altera statusAtivo para false. Um produto químico inativo é bloqueado ao tentar registrar novas cargas.",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID do produto químico",
                                    schema: { type: "string" },
                              },
                        ],
                        responses: {
                              200: {
                                    description: "Produto inativado com sucesso",
                                    content: {
                                          "application/json": {
                                                example: "Produto com a ID a1b2c3d4 foi Inativado",
                                          },
                                    },
                              },
                              400: { description: "Produto não encontrado" },
                        },
                  },
            },
            "/cargas-quimicas": {
                  post: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Registrar uma nova carga química",
                        description:
                              "Regras aplicadas: 1) Exige produto químico cadastrado e ATIVO; 2) Quantidade deve ser maior que zero (> 0); 3) Toda carga nasce com status REGISTRADA.",
                        requestBody: {
                              required: true,
                              content: {
                                    "application/json": {
                                          example: {
                                                codigoCarga: "CARGA-SANTOS-001",
                                                produtoId: "COLE_AQUI_O_ID_DO_PRODUTO",
                                                responsavelTecnicoId: "user-1",
                                                origemCarga: "Porto de Rotterdam",
                                                destinoCarga: "Porto de Santos",
                                                quantidade: 150,
                                                unidadeMedida: "Toneladas",
                                          },
                                    },
                              },
                        },
                        responses: {
                              201: {
                                    description: "Carga registrada com sucesso",
                                    content: {
                                          "application/json": {
                                                example: {
                                                      id: "1792880000000",
                                                      codigoCarga: "CARGA-SANTOS-001",
                                                      status: "REGISTRADA",
                                                      origemCarga: "Porto de Rotterdam",
                                                      destinoCarga: "Porto de Santos",
                                                },
                                          },
                                    },
                              },
                              400: {
                                    description: "Violação de regra (produto inativo, quantidade <= 0, etc.)",
                                    content: {
                                          "application/json": {
                                                example: { erro: "A quantidade da carga deve ser maior que zero." },
                                          },
                                    },
                              },
                        },
                  },
                  get: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Listar todas as cargas químicas",
                        responses: {
                              200: { description: "Lista de cargas químicas retornada com sucesso" },
                        },
                  },
            },
            "/cargas-quimicas/{id}": {
                  get: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Buscar carga química por identificador (ID)",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID da carga química",
                                    schema: { type: "string" },
                              },
                        ],
                        responses: {
                              200: { description: "Dados completos da carga química" },
                              400: { description: "Carga não encontrada" },
                        },
                  },
            },
            "/cargas-quimicas/{id}/status": {
                  patch: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Atualizar status da carga (Máquina de Estados)",
                        description:
                              "Fluxo principal permitido: REGISTRADA -> EM_ANALISE -> EM_INSPECAO -> LIBERADA -> EM_MOVIMENTO -> FINALIZADA. Cargas FINALIZADAS ou CANCELADAS são estados terminais e bloqueiam novas transições.",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID da carga química",
                                    schema: { type: "string" },
                              },
                        ],
                        requestBody: {
                              required: true,
                              content: {
                                    "application/json": {
                                          example: {
                                                novoStatus: "EM_ANALISE",
                                          },
                                    },
                              },
                        },
                        responses: {
                              200: { description: "Status alterado com sucesso" },
                              400: {
                                    description: "Transição proibida pela máquina de estados",
                                    content: {
                                          "application/json": {
                                                example: { erro: "Transição de status não permitida." },
                                          },
                                    },
                              },
                        },
                  },
            },
            "/cargas-quimicas/{id}/bloquear": {
                  patch: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Bloquear carga química em inspeção",
                        description:
                              "Regras aplicadas: Exige motivo obrigatório, registra o evento no histórico e impede que a carga entre em movimentação.",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID da carga química",
                                    schema: { type: "string" },
                              },
                        ],
                        requestBody: {
                              required: true,
                              content: {
                                    "application/json": {
                                          example: {
                                                motivo: "Vazamento identificado na válvula do container",
                                          },
                                    },
                              },
                        },
                        responses: {
                              200: { description: "Carga bloqueada com sucesso" },
                              400: { description: "Motivo ausente ou transição inválida" },
                        },
                  },
            },
            "/cargas-quimicas/{id}/liberar": {
                  patch: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Liberar carga química",
                        description:
                              "Regras aplicadas: 1) Produto deve estar ativo; 2) Documentação obrigatória deve estar validada; 3) Carga deve estar EM_INSPECAO e não pode estar bloqueada ou cancelada.",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID da carga química",
                                    schema: { type: "string" },
                              },
                        ],
                        responses: {
                              200: { description: "Carga liberada com sucesso" },
                              400: {
                                    description: "Documentação pendente ou status inválido",
                                    content: {
                                          "application/json": {
                                                example: {
                                                      erro: "Documentação obrigatória não está completamente validada.",
                                                },
                                          },
                                    },
                              },
                        },
                  },
            },
            "/cargas-quimicas/{id}/cancelar": {
                  patch: {
                        tags: ["2. Cargas Químicas"],
                        summary: "Cancelar carga química (Estado Terminal)",
                        description:
                              "Regras aplicadas: Exige motivo/justificativa, registra no histórico e move a carga para o estado terminal CANCELADA (não permite liberação nem alterações posteriores).",
                        parameters: [
                              {
                                    name: "id",
                                    in: "path",
                                    required: true,
                                    description: "ID da carga química",
                                    schema: { type: "string" },
                              },
                        ],
                        requestBody: {
                              required: true,
                              content: {
                                    "application/json": {
                                          example: {
                                                motivo: "Cancelamento operacional solicitado pelo cliente",
                                          },
                                    },
                              },
                        },
                        responses: {
                              200: { description: "Carga cancelada com sucesso" },
                              400: { description: "Motivo não informado ou carga já finalizada" },
                        },
                  },
            },
      },
};