# 🍽️ **Projeto Alimcheck**

## 📌 1. Visão Geral

### 1.1 Nome do Projeto

**Alimcheck**

### 1.2 Descrição do Produto

O **Alimcheck** é uma aplicação web colaborativa que permite à população avaliar, recomendar e alertar sobre a qualidade dos alimentos e estabelecimentos alimentícios da cidade de Itacoatiara. A plataforma funciona como um sistema de avaliação comunitária, onde os cidadãos podem compartilhar suas experiências e consultar informações sobre feiras, restaurantes, lanchonetes e demais comércios de alimentos.

**Objetivo Principal:** Auxiliar os moradores a fazer escolhas mais seguras e conscientes sobre onde adquirir e consumir alimentos, apoiados pela colaboração e transparência da comunidade local.

---

### 1.3 Objetivo

Desenvolver uma **aplicação web responsiva e acessível** que permita aos moradores de Itacoatiara:

- **Avaliar** a qualidade dos alimentos e serviços oferecidos em feiras, restaurantes e estabelecimentos comerciais do setor alimentício 🛍️
- **Consultar** avaliações, comentários e denúncias realizadas por outros usuários da comunidade 👥
- **Tomar decisões seguras e informadas** sobre onde adquirir e consumir alimentos com base em informações confiáveis e atualizadas 🍲
- **Contribuir** para a melhoria da qualidade dos serviços alimentícios através do feedback coletivo 📢

---

### 1.4 Motivação

A **segurança alimentar** é um pilar fundamental para a saúde pública e o bem-estar da população. Em Itacoatiara, onde o consumo de alimentos em feiras livres, restaurantes locais e pequenos comércios faz parte da cultura e do cotidiano dos moradores, a falta de transparência e informações confiáveis sobre a qualidade dos produtos e serviços representa um risco significativo à saúde coletiva.

O **Alimcheck** nasce da necessidade de:

- **Empoderar os cidadãos** com informações transparentes e acessíveis sobre a qualidade dos estabelecimentos alimentícios 📢
- **Estimular boas práticas de higiene e manipulação de alimentos** nos estabelecimentos, através da visibilidade pública das avaliações 🧼
- **Criar uma rede comunitária de confiança**, onde consumidores compartilham experiências e se protegem mutuamente 🤝
- **Incentivar políticas públicas mais eficazes** através de dados concretos sobre a situação da segurança alimentar na cidade 🏛️
- **Promover a melhoria contínua** dos serviços prestados pelos estabelecimentos através do feedback direto dos consumidores 📊

---

### 1.5 Equipe de Desenvolvimento

**Bruno Manoel** | **Carlos Eduardo** | **Cíntia Seixas** | **Francisco Neto** | **Nelio Tobias**

---

### 1.6 Perfis de Usuários Finais

#### 👩‍💼 **Moderadores**

**Perfil:**
- Responsáveis pela moderação de conteúdo e análise de denúncias
- Utilizam preferencialmente computadores desktop 🖥️ para acesso à plataforma
- Necessitam de ferramentas avançadas de gestão e visualização de dados

**Necessidades:**
- Filtros avançados para moderação rápida e eficiente de avaliações e denúncias
- Ferramentas para análise de padrões de comportamento suspeitos dos usuarios(historico de postagens)

#### 👨‍🍳 **Donos de Estabelecimentos**

**Perfil:**
- Proprietários ou gestores de estabelecimentos alimentícios cadastrados na plataforma
- Utilizam dispositivos móveis 📱 ou computadores 💻 para acesso
- Interessados em monitorar a reputação de seus negócios e interagir com clientes

**Necessidades:**
- Monitoramento em tempo real das avaliações recebidas
- Gerenciamento de informações do estabelecimento (horário de funcionamento, cardápio)
- Capacidade de responder a avaliações e comentários dos clientes
- Visualização de estatísticas de desempenho e posicionamento em rankings
- Notificações sobre novas avaliações e comentários

#### 👩‍🏫 **Consumidores**

**Perfil:**
- Moradores de Itacoatiara que buscam informações sobre estabelecimentos alimentícios
- Utilizam predominantemente dispositivos móveis 📱, mas também computadores 💻
- Valorizam praticidade, informações visuais e experiências compartilhadas por outros usuários

**Necessidades:**
- Busca rápida e intuitiva de estabelecimentos por localização, tipo de comida ou avaliação
- Visualização de avaliações detalhadas com fotos e descrições
- Capacidade de avaliar estabelecimentos visitados e compartilhar experiências
- Possibilidade de realizar denúncias com evidências fotográficas
- Acesso a rankings e recomendações baseadas na comunidade

---

# 🎯 2. Escopo do Projeto

## 2.1 Escopo Específico (Versão Inicial)

### 🔑 Requisitos Funcionais (RF)

| Id | Descrição | Detalhamento | Prioridade |
|:---:|---|---|:---:|
| **RF-01** | O sistema deve permitir que o usuário se cadastre na plataforma. | O cadastro deve solicitar: nome completo, e-mail válido, senha (mínimo 8 caracteres), tipo de usuário (Cliente ou Dono de Estabelecimento). O sistema deve validar a unicidade do e-mail e enviar confirmação de cadastro. | Essencial |
| **RF-02** | O sistema deve permitir a autenticação (login) dos usuários cadastrados. | O login deve ser realizado através de e-mail e senha. O sistema deve validar as credenciais e criar uma sessão segura. Deve haver opção de recuperação de senha via e-mail. | Essencial |
| **RF-03** | O sistema deve permitir que usuários pesquisem estabelecimentos. | A pesquisa deve permitir filtros por: nome do estabelecimento, tipo de comida/categoria, localização (bairro/endereço), faixa de avaliação. Os resultados devem ser exibidos em ordem de relevância ou avaliação. | Essencial |
| **RF-04** | O sistema deve listar os estabelecimentos cadastrados na plataforma. | A listagem deve exibir: nome, foto principal, categoria, média de avaliação (em estrelas), número total de avaliações. Deve permitir ordenação por: avaliação, popularidade, ordem alfabética. | Essencial |
| **RF-05** | O sistema deve permitir que clientes avaliem estabelecimentos. | A avaliação deve conter: nota de 1 a 5 estrelas, comentário textual (opcional, máximo 500 caracteres), até 5 fotos (opcional). O sistema deve validar que o usuário está autenticado e respeitar a regra de uma avaliação por estabelecimento a cada 24 horas. | Essencial |
| **RF-06** | O sistema deve exibir rankings de estabelecimentos. | Deve haver rankings por: melhor avaliação geral, mais avaliados, por categoria (restaurantes, lanchonetes, feiras, etc.). Os rankings devem ser atualizados automaticamente conforme novas avaliações são registradas. | Importante |
| **RF-07** | O sistema deve permitir a denúncia de conteúdo impróprio. | Usuários autenticados podem denunciar avaliações ou comentários que contenham: linguagem ofensiva, informações falsas, spam, conteúdo inadequado. A denúncia deve incluir: motivo (selecionado de lista pré-definida), descrição adicional (opcional), evidências (capturas de tela). | Importante |
| **RF-08** | O sistema deve exibir o histórico de avaliações do usuário. | Cada usuário deve poder visualizar todas as avaliações que realizou, incluindo: estabelecimento avaliado, nota dada, comentário, fotos, data da avaliação. Deve permitir edição ou exclusão de avaliações próprias. | Desejável |
| **RF-09** | O sistema deve permitir que donos de estabelecimentos respondam às avaliações. | Donos podem responder publicamente a avaliações recebidas. A resposta deve ser exibida abaixo da avaliação original. Cada avaliação pode receber apenas uma resposta oficial do estabelecimento. A resposta pode ser editada posteriormente pelo dono. | Importante |
| **RF-10** | O sistema deve permitir a moderação de conteúdo por moderadores. | Moderadores podem: visualizar todas as avaliações e comentários, ocultar ou remover conteúdo inadequado, suspender usuários que violem as políticas da plataforma, visualizar histórico de ações de moderação. | Essencial |
| **RF-11** | O sistema deve permitir a revisão de denúncias por moderadores. | Moderadores devem ter acesso a uma fila de denúncias pendentes. Para cada denúncia, devem poder: visualizar o conteúdo denunciado e o contexto, aprovar (remover o conteúdo) ou rejeitar a denúncia, registrar justificativa da decisão, notificar o denunciante sobre o resultado. | Essencial |

---

### 🛡️ Requisitos Não Funcionais (RNF)

| Id | Descrição | Detalhamento | Categoria | Prioridade |
|:---:|---|---|---|:---:|
| **RNF-01** | O sistema deve ser responsivo e adaptável a diferentes dispositivos. | A interface deve funcionar adequadamente em: smartphones (Android e iOS), tablets, computadores desktop. O layout deve se ajustar automaticamente ao tamanho da tela, mantendo usabilidade e legibilidade. | Usabilidade | Essencial |
| **RNF-02** | O sistema deve possuir mecanismos de proteção contra spam e abuso. | Implementar: limitação de taxa de requisições (rate limiting), CAPTCHA em formulários sensíveis (cadastro, avaliação), detecção de padrões suspeitos (múltiplas avaliações em curto período), bloqueio temporário de contas suspeitas. | Segurança | Essencial |
| **RNF-03** | O sistema deve garantir a integridade dos dados nas transações. | Utilizar transações ACID no banco de dados. Implementar validações de dados no frontend e backend. Garantir que operações críticas (cadastro, avaliação, moderação) sejam atômicas e consistentes. | Segurança | Essencial |
| **RNF-04** | O sistema deve realizar backup diário dos dados. | Backups automáticos devem ser executados diariamente em horário de menor uso (ex: 3h da madrugada). Os backups devem ser armazenados em local seguro e separado do servidor principal. Deve haver processo de restauração testado e documentado. Retenção mínima de 30 dias de backups. | Confiabilidade | Importante |

---

### ⚖️ Regras de Negócio (RN)

| Id | Descrição | Justificativa | Prioridade |
|:---:|---|---|:---:|
| **RN-01** | Apenas usuários autenticados podem avaliar estabelecimentos. | Garante rastreabilidade das avaliações, previne spam e avaliações falsas, permite moderação efetiva. | Essencial |
| **RN-02** | Cada usuário só pode avaliar o mesmo estabelecimento uma vez a cada 24 horas. | Previne avaliações múltiplas maliciosas ou excessivas, garante que cada avaliação represente uma experiência distinta, reduz tentativas de manipulação de rankings. | Importante |
| **RN-03** | Avaliações devem conter no mínimo uma nota (estrelas) ou um comentário textual. | Garante que toda avaliação agregue informação útil à comunidade, evita avaliações vazias ou sem conteúdo. | Essencial |
| **RN-04** | Estabelecimentos só podem ser cadastrados por moderadores ou mediante validação. | Previne cadastros falsos ou duplicados, garante a qualidade e veracidade das informações dos estabelecimentos, permite controle sobre o conteúdo da plataforma. | Essencial |
| **RN-05** | Donos de estabelecimentos só podem gerenciar estabelecimentos vinculados à sua conta. | Garante segurança e privacidade, previne acesso não autorizado a informações de outros estabelecimentos. | Essencial |
| **RN-06** | Conteúdo denunciado por 3 ou mais usuários distintos deve ser automaticamente sinalizado para revisão prioritária. | Agiliza a moderação de conteúdo potencialmente problemático, utiliza a sabedoria coletiva para identificar violações. | Importante |

---

## 2.2 Escopo Futuro (Versões Posteriores)

### 🔮 Requisitos Funcionais Futuros

| Id | Descrição | Detalhamento | Prioridade |
|:---:|---|---|---|
| **RF-12** | O sistema deve permitir denúncias específicas direcionadas à vigilância sanitária. | Usuários poderão realizar denúncias formais com categorias específicas: falta de higiene, alimentos vencidos, manipulação inadequada, ausência de alvará sanitário. As denúncias devem incluir evidências fotográficas obrigatórias e descrição detalhada. O sistema deve gerar relatórios formatados para envio às autoridades competentes. | Importante |
| **RF-13** | O sistema deve recomendar estabelecimentos personalizados com base no perfil do usuário. | Utilizar algoritmo de recomendação baseado em: histórico de avaliações do usuário, preferências de categoria, localização frequente, avaliações de usuários com perfil similar. As recomendações devem ser exibidas na página inicial e atualizadas periodicamente. | Desejável |
| **RF-14** | O sistema deve permitir que usuários sigam estabelecimentos favoritos. | Usuários podem marcar estabelecimentos como favoritos e receber notificações sobre: novas avaliações, respostas dos donos, alterações de informações (horário, cardápio). | Desejável |
| **RF-15** | O sistema deve gerar relatórios estatísticos para estabelecimentos. | Donos de estabelecimentos devem ter acesso a dashboards com: evolução das avaliações ao longo do tempo, palavras-chave mais mencionadas nos comentários, comparação com estabelecimentos similares, sugestões de melhoria baseadas no feedback. | Desejável |

---

### 🛡️ Requisitos Não Funcionais Futuros

| Id | Descrição | Detalhamento | Categoria | Prioridade |
|:---:|---|---|---|:---:|
| **RNF-05** | As denúncias à vigilância sanitária devem ser criptografadas ponta-a-ponta. | Implementar criptografia forte (AES-256) para proteger dados sensíveis das denúncias. Garantir que apenas o denunciante e as autoridades competentes tenham acesso ao conteúdo completo. Armazenar logs de acesso para auditoria. | Segurança | Essencial |
| **RNF-06** | O sistema deve seguir as diretrizes de acessibilidade WCAG 2.1 nível AA. | Implementar: navegação por teclado completa, compatibilidade com leitores de tela, contraste adequado de cores, textos alternativos em imagens, legendas em conteúdos multimídia. Realizar testes de acessibilidade com usuários com deficiência. | Usabilidade | Desejável |
| **RNF-07** | O sistema deve suportar no mínimo 1000 usuários simultâneos sem degradação de performance. | Implementar arquitetura escalável com balanceamento de carga. Tempo de resposta máximo de 2 segundos para operações comuns (listagem, busca). Otimização de consultas ao banco de dados e cache de conteúdo estático. | Performance | Importante |
| **RNF-08** | O sistema deve ter disponibilidade mínima de 99% ao mês. | Implementar monitoramento contínuo da aplicação. Configurar alertas automáticos para falhas. Plano de recuperação de desastres documentado e testado. Manutenções programadas devem ocorrer em horários de baixo uso. | Confiabilidade | Importante |

---

### ⚖️ Regras de Negócio Futuras

| Id | Descrição | Justificativa | Prioridade |
|:---:|---|---|:---:|
| **RN-07** | Denúncias graves à vigilância sanitária devem passar por análise prévia antes da publicação. | Previne denúncias falsas ou mal-intencionadas que possam prejudicar estabelecimentos injustamente. Garante que apenas denúncias fundamentadas sejam encaminhadas às autoridades. Protege a plataforma de responsabilidade legal. | Essencial |
| **RN-08** | Usuários com histórico de avaliações falsas ou spam devem ter suas avaliações marcadas como "não verificadas". | Mantém a confiabilidade da plataforma. Permite que a comunidade identifique usuários problemáticos. Não remove completamente o conteúdo, mas sinaliza sua menor confiabilidade. | Importante |
| **RN-09** | Estabelecimentos com média inferior a 2 estrelas por mais de 30 dias devem receber notificação para melhoria. | Incentiva estabelecimentos a melhorar seus serviços. Demonstra compromisso da plataforma com a qualidade. Oferece oportunidade de correção antes de medidas mais drásticas. | Desejável |
| **RN-10** | Avaliações com fotos devem ter peso maior no cálculo da média de avaliação do estabelecimento. | Incentiva usuários a fornecer evidências visuais. Aumenta a confiabilidade das avaliações. Valoriza contribuições mais completas e úteis para a comunidade. | Desejável |

---

## 🔒 3. Considerações de Segurança

### 3.1 Autenticação e Autorização

- **Senhas:** Devem ser armazenadas utilizando hash seguro (bcrypt ou Argon2) com salt único por usuário.
- **Sessões:** Implementar tokens de sessão seguros com expiração automática após período de inatividade (30 minutos).
- **Controle de Acesso:** Implementar verificação de permissões em todas as operações sensíveis (avaliação, moderação, gerenciamento de estabelecimento).
- **Recuperação de Senha:** Utilizar tokens temporários de uso único enviados por e-mail, com validade máxima de 1 hora.

### 3.2 Proteção de Dados

- **Dados Pessoais:** Coletar apenas informações estritamente necessárias. Implementar conformidade com LGPD (Lei Geral de Proteção de Dados).
- **Criptografia:** Utilizar HTTPS/TLS para todas as comunicações entre cliente e servidor.
- **Validação de Entrada:** Sanitizar e validar todos os dados recebidos do usuário para prevenir injeção SQL, XSS e outras vulnerabilidades.
- **Upload de Arquivos:** Validar tipo, tamanho e conteúdo de imagens enviadas. Armazenar em diretório separado sem permissão de execução.

### 3.3 Proteção Contra Abuso

- **Rate Limiting:** Limitar número de requisições por IP/usuário em endpoints sensíveis (login, cadastro, avaliação).
- **CAPTCHA:** Implementar em formulários de cadastro e após múltiplas tentativas de login falhadas.
- **Detecção de Padrões:** Monitorar comportamentos suspeitos (múltiplas avaliações negativas em curto período, contas criadas em massa).
- **Bloqueio Temporário:** Suspender automaticamente contas com comportamento identificado como spam ou abusivo, com revisão por moderador.

---

## 📱 4. Considerações de Usabilidade

### 4.1 Interface Responsiva

- **Mobile-First:** Priorizar design para dispositivos móveis, considerando que a maioria dos usuários acessará via smartphone.
- **Navegação Intuitiva:** Menu simplificado com no máximo 5 itens principais. Acesso rápido às funcionalidades mais utilizadas (busca, avaliação).
- **Performance:** Otimizar carregamento de imagens (lazy loading, compressão). Minimizar uso de dados móveis.

### 4.2 Experiência do Usuário

- **Feedback Visual:** Fornecer feedback imediato para todas as ações do usuário (botões, formulários, carregamento).
- **Mensagens Claras:** Utilizar linguagem simples e direta em mensagens de erro e sucesso.
- **Acessibilidade:** Garantir contraste
