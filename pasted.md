# **QuimiPort — Gestão de Cargas Químicas Portuárias**

Proposta técnica, modelagem de domínio (DDD) e arquitetura de software (Clean Architecture) para o sistema de gestão, rastreabilidade e validação de segurança de cargas químicas no ambiente portuário do Porto de Santos.

## **1\. Visão Geral do Projeto & Contexto**

A movimentação de produtos químicos em áreas portuárias exige controle rígido sobre licenças ambientais, classificação de risco de periculosidade, auditoria técnica e áreas de alocação física para prevenir acidentes operacionais e ambientais.

O **QuimiPort** é uma solução criada para eliminar controles descentralizados ou manuais, fornecendo um núcleo de validações automáticas de segurança e garantindo que nenhuma carga com pendências fiscais, laudos reprovados ou sem responsável técnico seja movimentada ou liberada para expedição.

## **2\. Linguagem Ubíqua (DDD)**

-   **Carga Química:** Mercadoria acondicionada submetida ao fluxo de recepção, fiscalização e expedição do porto.

-   **Produto Químico:** Item catalogado com especificações técnicas e classe de risco de periculosidade.

-   **Invariante:** Regra de negócio absoluta e imutável mantida pelas raízes de agregado.

-   **Espaço de Armazenamento:** Posição física (baia/slot) dentro de um setor do pátio portuário onde a carga é temporariamente disposta.

-   **Responsável Técnico (RT):** Profissional habilitado responsável por auditar a carga e emitir a liberação oficial.

## **3\. Arquitetura de Domínio (DDD)**

O domínio é estruturado em redor de **3 Entidades Principais** e seus respectivos agregados:

1.  **CargaQuimica (Aggregate Root):** Raiz do agregado principal. Centraliza a máquina de estados e agrega:

-   **DocumentoCarga:** Licenças, laudos ambientais e autorizações.

-   **HistoricoCarga:** Linha do tempo auditável de eventos e transições de status.

2.  **ProdutoQuimico (Entidade):** Item do catálogo contendo código, nome, classe de risco internacional e indicador de status (ativo/inativo).

3.  **Usuario (Entidade Abstrata):** Base para controle de acesso por perfil (RBAC):

-   **ResponsavelTecnico:** Profissional habilitado (CRQ/CREA) responsável legal pela validação e liberação.

-   **InspetorQualidade:** Perfil responsável por vistorias, laudos de detetização e bloqueios.

-   **OperadorPortuario:** Perfil responsável por registro de carga, check-in e movimentações físicas.

-   **Gestor:** Perfil administrativo responsável por cancelamentos e gestão do catálogo de produtos.

4.  **AreaArmazenamento (Aggregate Root):** Gerencia a infraestrutura do pátio:

-   **Setor:** Divisão lógica do pátio agrupada por tipo de periculosidade.

-   **EspacoArmazenamento:** Posição física específica (baia) onde a CargaQuimica é alocada.

### **Diagrama de Domínio e Entidades**

classDiagram
direction TB

namespace Dominio\_Carga {
class CargaQuimica {
<<Aggregate Root>>
+String codigo
+Number quantidade
+StatusCarga status
+registrar()
+liberar()
+bloquear()
+cancelar()
+atualizarStatus()
}

class ProdutoQuimico {
<<Entity>>
+String codigo
+String nome
+String classeRisco
+Boolean ativo
+cadastrar()
+inativar()
}

class DocumentoCarga {
<<Entity>>
+String numeroDocumento
+String tipoDocumento
+Boolean validado
}

class HistoricoCarga {
<<Entity>>
+DateTime dataOcorrencia
+String evento
+String descricao
}

class StatusCarga {
<<Enum>>
REGISTRADA
EM\_MOVIMENTACAO
EM\_INSPECAO
LIBERADA
BLOQUEADA
CANCELADA
FINALIZADA
}
}

namespace Estrutura\_Armazenamento {
class AreaArmazenamento {
<<Aggregate Root>>
+String id
+String nomePatios
}

class Setor {
<<Entity>>
+String codigoSetor
+String tipoRiscoPermitido
}

class EspacoArmazenamento {
<<Value Object>>
+String identificadorBaia
+Boolean ocupado
}
}

namespace Controle\_Acesso {
class Usuario {
<<Abstract>>
+String id
+String nome
+String email
+String nivelAcesso
+autenticar()
}

class ResponsavelTecnico {
<<Entity>>
+String registroProfissional
+validarDocumentacao()
+liberarCarga()
}

class InspetorQualidade {
<<Entity>>
+String credencialInspecao
+emitirLaudo()
+bloquearCarga()
}

class OperadorPortuario {
<<Entity>>
+String turnoTrabalho
+registrarMovimentacao()
}

class Gestor {
<<Entity>>
+String departamento
+cancelarCarga()
}
}

Usuario <|-- ResponsavelTecnico
Usuario <|-- InspetorQualidade
Usuario <|-- OperadorPortuario
Usuario <|-- Gestor

CargaQuimica "1" \*-- "1..\*" ProdutoQuimico : Associa (Deve estar ativo)
CargaQuimica "1" \*-- "1..\*" DocumentoCarga : Agrega
CargaQuimica "1" \*-- "0..\*" HistoricoCarga : Registra
CargaQuimica "1" o-- "1" ResponsavelTecnico : Requer assinatura
CargaQuimica \*-- StatusCarga : Gerencia
CargaQuimica "0..1" o-- "1" EspacoArmazenamento : Alocada em

AreaArmazenamento "1" \*-- "1..\*" Setor : Composta por
Setor "1" \*-- "1..\*" EspacoArmazenamento : Contém

## **4\. Regras de Negócio & Fluxo de Transição de Status**

### **Invariantes Principais**

1.  **Ativação de Produto:** Cargas químicas não podem ser registradas com produtos inativos ou sem classe de risco.

2.  **Documentação:** A liberação para embarque é bloqueada se o DocumentoCarga não estiver validado pelo ResponsavelTecnico.

3.  **Restrição de Movimentação:** Cargas com status BLOQUEADA ou CANCELADA não podem ser alocadas em novos EspacosArmazenamento.

4.  **Inspeção Ativa:** Cargas em vistoria não podem ser finalizadas sem laudo aprovado.

### **Fluxo de Transição de Status (State Machine)**

stateDiagram-v2
\[\*\] --> REGISTRADA : Registrar Carga Química

state REGISTRADA {
\[\*\] --> AguardandoAlocacao
AguardandoAlocacao --> AlocadaEmEspaco : Selecionar EspacoArmazenamento
}

REGISTRADA --> EM\_MOVIMENTACAO : Mover entre Espaços/Setores

EM\_MOVIMENTACAO --> EM\_INSPECAO : Solicitar Vistoria
EM\_INSPECAO --> EM\_MOVIMENTACAO : Vistoria Concluída (Laudo OK)

EM\_MOVIMENTACAO --> BLOQUEADA : Bloqueio de Segurança / Avaria
EM\_INSPECAO --> BLOQUEADA : Reprovada na Inspeção

BLOQUEADA --> EM\_MOVIMENTACAO : Regularização Concluída

EM\_MOVIMENTACAO --> LIBERADA : Validado por Responsável Técnico
LIBERADA --> FINALIZADA : Saída / Embarque Realizado

REGISTRADA --> CANCELADA : Cancelamento pelo Gestor
EM\_MOVIMENTACAO --> CANCELADA : Cancelamento pelo Gestor
BLOQUEADA --> CANCELADA : Cancelamento pelo Gestor

FINALIZADA --> \[\*\]
CANCELADA --> \[\*\]

## **5\. Casos de Uso do Sistema**

<table><colgroup><col><col><col><col><col></colgroup><tbody><tr><th><p><span data-mv-mark="bold">Caso de Uso</span></p></th><th><p><span data-mv-mark="bold">Ator Principal</span></p></th><th><p><span data-mv-mark="bold">Entrada</span></p></th><th><p><span data-mv-mark="bold">Saída</span></p></th><th><p><span data-mv-mark="bold">Regra de Negócio Aplicada</span></p></th></tr><tr><td><p><span data-mv-mark="bold">Cadastrar Produto Químico</span></p></td><td><p>Gestor</p></td><td><p>Nome, Código, Classe Risco</p></td><td><p>Produto cadastrado e Ativo</p></td><td><p>Nome e Classe de Risco são obrigatórios.</p></td></tr><tr><td><p><span data-mv-mark="bold">Inativar Produto Químico</span></p></td><td><p>Gestor</p></td><td><p>ID Produto</p></td><td><p>Produto Inativo</p></td><td><p>Impede uso do produto em novos registros.</p></td></tr><tr><td><p><span data-mv-mark="bold">Registrar Carga Química</span></p></td><td><p>Operador Portuário</p></td><td><p>Qtd (&gt;0), ID Produto, ID RT</p></td><td><p>Carga criada em REGISTRADA</p></td><td><p>Produto deve estar ativo e possuir risco.</p></td></tr><tr><td><p><span data-mv-mark="bold">Alocar Espaço de Armazenamento</span></p></td><td><p>Operador Portuário</p></td><td><p>ID Carga, ID EspacoArmazenamento</p></td><td><p>Carga vinculada ao Espaço</p></td><td><p>Cargas bloqueadas não movimentam.</p></td></tr><tr><td><p><span data-mv-mark="bold">Validar Documentação</span></p></td><td><p>Responsável Técnico</p></td><td><p>ID Carga, ID Documento</p></td><td><p>Status Documento = Validado</p></td><td><p>Exige assinatura do RT cadastrado.</p></td></tr><tr><td><p><span data-mv-mark="bold">Solicitar / Realizar Inspeção</span></p></td><td><p>Inspetor Qualidade</p></td><td><p>ID Carga, Parecer Técnico</p></td><td><p>Laudo criado, Status EM_INSPECAO</p></td><td><p>Gera registro no HistoricoCarga.</p></td></tr><tr><td><p><span data-mv-mark="bold">Liberar Carga Química</span></p></td><td><p>Responsável Técnico</p></td><td><p>ID Carga</p></td><td><p>Status Carga = LIBERADA</p></td><td><p>Requer documentação completa validada.</p></td></tr><tr><td><p><span data-mv-mark="bold">Bloquear Carga Química</span></p></td><td><p>Inspetor / RT</p></td><td><p>ID Carga, Motivo</p></td><td><p>Status Carga = BLOQUEADA</p></td><td><p>Impede qualquer saída ou movimentação.</p></td></tr><tr><td><p><span data-mv-mark="bold">Cancelar Carga Química</span></p></td><td><p>Gestor</p></td><td><p>ID Carga, Justificativa</p></td><td><p>Status Carga = CANCELADA</p></td><td><p>Não permite cancelar se já FINALIZADA.</p></td></tr></tbody></table>

## **6\. Arquitetura da Aplicação (Clean Architecture)**

A solução é desenhada seguindo a Clean Architecture, garantindo a Regra de Dependência em que o domínio não possui dependências de frameworks, interfaces de usuário ou bancos de dados.

flowchart TD
classDef l4 fill:#fafafa,stroke:#d63031,stroke-width:2px,color:#2d3436
classDef l3 fill:#e7f5f2,stroke:#00b894,stroke-width:2px,color:#2d3436
classDef l2 fill:#fff5e6,stroke:#fdcb6e,stroke-width:2px,color:#2d3436
classDef l1 fill:#e6f7ff,stroke:#0984e3,stroke-width:2px,color:#2d3436

subgraph L4 \[4. Frameworks & Drivers / Infraestrutura\]
UI\[Interface Web / SPA\]
DB\[(Banco Postgres)\]
HTTP\[Servidor HTTP Express / Fastify\]
end
class L4 l4

subgraph L3 \[3. Interface Adapters / Adaptadores\]
CargaController\[CargaController\]
CargaPresenter\[CargaPresenter\]
CargaRepositoryImpl\[CargaRepositoryPostgres\]
end
class L3 l3

subgraph L2 \[2. Application Business Rules / Casos de Uso\]
UC\_Registrar\[RegistrarCargaQuimicaUseCase\]
UC\_Liberar\[LiberarCargaQuimicaUseCase\]
ICargaRepository\[\[ICargaRepository\]\]
end
class L2 l2

subgraph L1 \[1. Enterprise Business Rules / Domínio Core\]
E\_Carga\[CargaQuimica - Aggregate Root\]
E\_Prod\[ProdutoQuimico - Entity\]
E\_User\[Usuario - Abstract & Perfis\]
E\_Area\[AreaArmazenamento / Setor / Espaco\]
end
class L1 l1

UI --> HTTP
HTTP --> CargaController
CargaController --> UC\_Registrar
CargaController --> UC\_Liberar
UC\_Liberar --> CargaPresenter

CargaRepositoryImpl -.->|Implementa| ICargaRepository
CargaRepositoryImpl --> DB

UC\_Registrar --> ICargaRepository
UC\_Liberar --> ICargaRepository

UC\_Registrar --> E\_Carga
UC\_Liberar --> E\_Carga
E\_Carga --> E\_Prod
E\_Carga --> E\_User
E\_Carga --> E\_Area

## **7\. Estrutura do Repositório (Clean Architecture)**

quimiport/
├── .github/
│ └── workflows/
│ └── ci-cd.yml
├── docs/
│ ├── architecture/
│ └── diagrams/
├── src/
│ ├── @types/
│ ├── core/
│ │ ├── domain/ # CAMADA 1: ENTIDADES E DOMÍNIO CORE
│ │ │ ├── aggregates/
│ │ │ │ ├── carga-quimica.aggregate.ts
│ │ │ │ └── area-armazenamento.aggregate.ts
│ │ │ ├── entities/
│ │ │ │ ├── produto-quimico.entity.ts
│ │ │ │ ├── documento-carga.entity.ts
│ │ │ │ ├── historico-carga.entity.ts
│ │ │ │ ├── setor.entity.ts
│ │ │ │ └── usuarios/
│ │ │ │ ├── usuario.abstract.ts
│ │ │ │ ├── responsavel-tecnico.entity.ts
│ │ │ │ ├── inspetor-qualidade.entity.ts
│ │ │ │ ├── operador-portuario.entity.ts
│ │ │ │ └── gestor.entity.ts
│ │ │ ├── value-objects/
│ │ │ │ ├── quantidade.vo.ts
│ │ │ │ ├── classe-risco.vo.ts
│ │ │ │ └── espaco-armazenamento.vo.ts
│ │ │ ├── enums/
│ │ │ │ └── status-carga.enum.ts
│ │ │ └── exceptions/
│ │ │ └── domain.exception.ts
│ │ │
│ │ └── application/ # CAMADA 2: CASOS DE USO (ORQUESTRADORES)
│ │ ├── use-cases/
│ │ │ ├── registrar-carga-quimica.usecase.ts
│ │ │ ├── liberar-carga-quimica.usecase.ts
│ │ │ ├── bloquear-carga-quimica.usecase.ts
│ │ │ ├── alocar-espaco-armazenamento.usecase.ts
│ │ │ ├── validar-documenta-carga.usecase.ts
│ │ │ └── cadastrar-produto-quimico.usecase.ts
│ │ ├── dtos/
│ │ │ ├── registrar-carga-input.dto.ts
│ │ │ └── carga-output.dto.ts
│ │ └── repositories/ # Interfaces dos Repositórios
│ │ ├── icarga-repository.ts
│ │ ├── iproduto-repository.ts
│ │ └── iarea-armazenamento-repository.ts
│ │
│ ├── adapters/ # CAMADA 3: ADAPTADORES DE INTERFACE
│ │ ├── controllers/
│ │ │ ├── carga.controller.ts
│ │ │ └── produto.controller.ts
│ │ ├── presenters/
│ │ │ └── carga.presenter.ts
│ │ └── repositories-impl/ # Implementações de Persistência
│ │ ├── in-memory-carga.repository.ts
│ │ └── postgres-carga.repository.ts
│ │
│ └── infrastructure/ # CAMADA 4: FRAMEWORKS, DRIVERS E CONFIGS
│ ├── http/
│ │ ├── server.ts
│ │ └── routes/
│ ├── database/
│ │ └── config.ts
│ └── logging/
│
├── tests/
│ ├── unit/ # Testes Unitários de Regras de Domínio
│ │ ├── carga-quimica.spec.ts
│ │ ├── produto-quimico.spec.ts
│ │ └── area-armazenamento.spec.ts
│ └── integration/ # Testes de Integração dos Casos de Uso
│ └── liberar-carga.usecase.spec.ts
│
├── .eslintrc.json
├── package.json
├── tsconfig.json
└── README.md

## **8\. Fluxo Operacional Macro das Operações Portuárias (Embarque e Desembarque)**

O diagrama abaixo descreve o fluxo macro de movimentação física e lógica das cargas portuárias no **QuimiPort**, contemplando os ciclos de **Exportação (Embarque)** e **Importação (Desembarque)** de mercadorias químicas, bem como os atores externos e os subprocessos operacionais de inspeção, expurgo (detetização) e estufagem/desova.

flowchart TD
classDef actor fill:#1e3799,stroke:#0c2461,stroke-width:2px,color:#fff
classDef process fill:#f5f6fa,stroke:#718093,stroke-width:2px,color:#2f3640
classDef block fill:#0c2461,stroke:#1e3799,stroke-width:2px,color:#fff
classDef highlight fill:#eb4d4b,stroke:#b71540,stroke-width:2px,color:#fff

%% ATORES
ActorExp(\[Exportador / Despachante / Agente\]):::actor
ActorImp(\[Importador / Despachante / Agente\]):::actor

%% FLUXO DE EMBARQUE (EXPORTAÇÃO)
subgraph EXP \[Fluxo de Exportação / Embarque\]
direction TB

subgraph RecExp \[Recebimento Portuário\]
ContExp\[Contêiner\]
CargaExp\[Carga Química\]
end

PlanPatio\[Planejamento de Pátio\]
Estufagem\[Estufagem de Contêineres\]
PatioExp\[Pátio de Cargas Químicas\]

subgraph AberturaExp \[Abertura de Carga\]
VistoriaExp\[Vistoria / Inspeção\]
ExpurgoExp\[Expurgo / Detetização\]
TrocaUn\[Troca de Unidade / Embalagem\]
end

ArmazExp1\[Armazenagem Temporária\]
VistoriaDoc\[Vistoria / Validação Documental\]
ArmazExp2\[Armazenagem Liberada\]
ExpedicaoExp\[Expedição da Carga\]

LibEmbarque\[Liberação de Embarque - RT\]
AutEmbarque\[Autorização de Embarque\]
Carregamento\[Carregamento\]
end

%% OPERAÇÃO MARÍTIMA
subgraph MAR \[Operação Marítima e Navio\]
PrePlan\[Pré-Planejamento\]
Navio((NAVIO)):::highlight

subgraph PlanNavio \[Planejamento de Bordo\]
NavioPlan\[Planejamento Navio\]
OpPlan\[Planejamento Operação\]
PatioPlan\[Planejamento Pátio\]
end

Descarga\[Descarga de Importação\]
end

%% FLUXO DE DESEMBARQUE (IMPORTAÇÃO)
subgraph IMP \[Fluxo de Importação / Desembarque\]
direction TB

RecImp\[Recebimento / Conferência\]
PatioImp\[Pátio de Triagem\]

subgraph AberturaImp \[Abertura de Carga\]
VistoriaImp\[Vistoria Sanitária / FÍsica\]
ExpurgoImp\[Expurgo / Tratamento Química\]
Desova\[Desova de Contêiner\]
end

subgraph EntregaImp \[Entrega de Carga\]
Vazio\[Devolução Contêiner Vazio\]
House\[Carga House / Fracionada\]
end
end

%% CONEXÕES DE EXPORTAÇÃO
ActorExp --> RecExp
RecExp --> PlanPatio
PlanPatio --> Estufagem
Estufagem --> PatioExp

PlanPatio --> ArmazExp1
ArmazExp1 <--> VistoriaDoc
VistoriaDoc <--> ArmazExp2
ArmazExp2 --> ExpedicaoExp

PatioExp <--> AberturaExp
PatioExp --> LibEmbarque
LibEmbarque --> AutEmbarque
AutEmbarque --> Carregamento
Carregamento --> Navio

%% CONEXÕES DE NAVEGAÇÃO E PLANEJAMENTO
PrePlan --> Navio
Navio <--> PlanNavio
Navio --> Descarga

%% CONEXÕES DE IMPORTAÇÃO
Descarga --> RecImp
RecImp --> PatioImp
PatioImp <--> AberturaImp

AberturaImp --> EntregaImp
Desova --> EntregaImp
PatioImp --> EntregaImp
ArmazExp2 --> EntregaImp

EntregaImp --> ActorImp
ExpedicaoExp --> ActorImp

## **9\. Recomendações de Evolução & Design de Software**

Para evoluir a aplicação em direção a um ambiente enterprise resiliente e escalável, destacam-se as seguintes melhorias técnicas recomendadas:

1.  **Gestão de Eventos de Domínio (DomainEvents):** Desacoplar a geração de histórico e notificações através da publicação e escuta de eventos (ex: CargaLiberadaEvent, CargaBloqueadaEvent) via um EventDispatcher interno.

2.  **Referência por Identidade Entre Agregados:** Evitar acoplamento direto entre CargaQuimica e AreaArmazenamento. Manter apenas o EspacoArmazenamentoId no agregado de Carga para garantir que cada raiz de agregado seja carregada e persistida de forma isolada.

3.  **Controle de Concorrência Otimista (Optimistic Locking):** Implementar um atributo de versão (version) na entidade CargaQuimica para evitar condições de corrida (race conditions) em atualizações simultâneas do status da carga por diferentes operadores.

4.  **Mensageria Assíncrona na Infraestrutura:** Para integrações externas (SISCEN, ANVISA, IBAMA, autoridade portuária), utilizar filas de mensageria (RabbitMQ/Kafka) na camada de infraestrutura, mantendo os Casos de Uso independentes de sistemas externos.

5.  **Testes de Arquitetura Automatizados:** Utilizar bibliotecas como dependency-cruiser ou ts-arch no pipeline de CI/CD para impedir programmaticamente que arquivos do Domínio importem bibliotecas de Infraestrutura ou Casos de Uso.