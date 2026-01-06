📖 Bukiz: Manifesto de Engenharia e Regras de Domínio

Este documento estabelece as diretrizes invioláveis para o desenvolvimento do sistema Bukiz. Qualquer implementação deve ser fundamentada em Doman-Driven Design (DDD) e Clean Architecture.

🏛️ 1. Pilares da Arquitetura

1.1 Domínio Rico vs. Modelo Anémico (DDD)
As Regras de Negócio (RN) não são simples validações de formulário; são Invariantes de Domínio.
A Ordem: Entidades como Livro e Pedido devem ser "ricas". Elas próprias guardam a lógica de integridade.
Fundamento: O Domínio deve garantir o seu estado em todos os momentos. Se a RN-02 diz que o stock não pode ser negativo, a entidade Livro deve lançar uma exceção se um método baixarStock() tentar violar essa regra. O domínio é o coração blindado do software.

1.2 Clean Architecture: Independência de Infraestrutura
A lógica de negócio deve ser agnóstica à tecnologia de base de dados ou frameworks.
A Ordem: O Domínio não conhece a Base de Dados. Usa o Pattern Repository.
Fundamento: Camadas de Entities e Use Cases estão no centro. Adaptadores de interface e infraestrutura (DB, APIs de Notificação) estão na periferia. Se o sistema de notificações mudar, o core da Bukiz deve permanecer inalterado.

1.3 Agregados e Raízes de Consistência
A Ordem: O Pedido é um Aggregate Root. Ele controla os seus ItensPedido.
Fundamento: Para garantir a RN-04 (Imutabilidade de Preço), o Agregado Pedido deve encapsular a lógica que captura o preço do catálogo e o fixa no momento da criação. Ninguém altera dados internos do pedido sem passar pela Raiz do Agregado.

⚖️ Regras de Negócio (Constituição Bukiz)

Módulo: Gestão Interna & Catálogo
RN-01: Proibido registar livros sem Título, Preço e Stock inicial.
RN-02: O stock físico nunca pode ser negativo ($Stock \ge 0$).
RN-03: Um livro esgotado deve perder automaticamente o status de "Destaque".
RN-08: Bloqueio de cadastro para duplicidade (mesmo binómio Título + Autor).
RN-09: Proibido registar livros com preço zero.

Módulo: Checkout & Pedidos
RN-04: Preço de pedidos em andamento é imutável perante alterações no catálogo.
RN-05: Reserva temporária de stock por 30 minutos. Após isso, o stock é libertado.
RN-06: Transferência de posse (física ou digital) vinculada obrigatoriamente à confirmação financeira.
RN-07: Bloqueio de compra duplicada para o mesmo livro digital pelo mesmo cliente.

🛡️ Desafio de Arquitetura para Entigravity

Para garantir o alinhamento com a Clean Architecture, deves resolver o seguinte cenário de validação da RN-08 (Duplicidade):

Localização da Lógica: Onde ficará a verificação de existência do livro? No Domain Service (coordenando repositórios) ou no Use Case (Interacting)?
Validação Preventiva: Como garantirás que a RN-01 (Campos Obrigatórios) seja validada antes mesmo do objeto tentar ser persistido?

Nota de Supervisão:
> "Entigravity, o Sr. Mauro Júlio não nos contratou para fazer um 'site de vendas', mas sim para construir um motor de integridade comercial onde o erro é impossível."
— Gabriel Francisco, Engenheiro de Arquitetura
