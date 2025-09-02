# Descrição Geral do Projeto

## 1.1 Nome do Projeto
**Alimcheck**

## 1.2 Descrição do Produto
Uma aplicação web que permita que a própria população avalie, recomende e alerte sobre a qualidade dos alimentos e estabelecimentos da cidade, ajudando outros moradores a fazerem escolhas mais seguras e conscientes.

## 1.3 Objetivo
O projeto tem como objetivo desenvolver um aplicativo mobile que permita aos moradores de Itacoatiara avaliarem a qualidade dos alimentos oferecidos por estabelecimentos locais, como feiras, restaurantes e comércios cadastrados na plataforma.  
A proposta é promover a segurança alimentar e apoiar decisões mais conscientes por meio da colaboração da própria comunidade.

## 1.4 Motivação
A segurança alimentar é um tema essencial para a saúde pública, especialmente em cidades como Itacoatiara, onde o consumo de alimentos em feiras, restaurantes e comércios locais é parte importante da cultura e do cotidiano da população.  
No entanto, a ausência de mecanismos transparentes que informem sobre a qualidade dos alimentos e das práticas sanitárias desses estabelecimentos expõe os consumidores a riscos muitas vezes evitáveis.

A proposta do aplicativo surge como resposta à necessidade de empoderar os cidadãos por meio da informação e da colaboração comunitária.  
Com ele, será possível criar uma rede de avaliações feitas pelos próprios moradores, promovendo transparência e estimulando os estabelecimentos a manterem padrões elevados de higiene e qualidade.

Além disso, o projeto se alinha a uma tendência crescente de uso da tecnologia para resolver problemas locais com impacto direto na vida das pessoas.  
Acredita-se que a solução possa incentivar práticas mais conscientes, apoiar a fiscalização indireta e abrir espaço para políticas públicas mais eficazes voltadas à segurança alimentar no município.

## 1.5 Equipe de Desenvolvimento
Bruno, Carlos, Cíntia, Francisco e Nélio

## 1.6 Descrição dos Usuários Finais

**👩‍💼 Moderadores da Plataforma (Ex: Aline Barbosa)**  
Profissionais responsáveis pela moderação de conteúdo, análise de denúncias e monitoramento do comportamento dos usuários. Utilizam o sistema via computador, com foco em ferramentas como dashboards, filtros e histórico. Precisam de recursos avançados para gerenciamento de dados, identificação de comportamentos abusivos e alertas automáticos para tomada de decisão rápida e confiável.

**👨‍🍳 Donos de Estabelecimentos (Ex: Carlos Mendes)**  
Comerciantes e proprietários de restaurantes que utilizam o sistema para monitorar avaliações, atualizar o perfil do seu negócio e destacar boas práticas sanitárias. Usam o app via celular ou computador e valorizam funcionalidades como envio de certificados sanitários, respostas a avaliações e atualização de informações para atrair clientes.

**👩‍🏫 Consumidores/Clientes Finais (Ex: Maria Oliveira)**  
Usuários que utilizam o aplicativo para pesquisar estabelecimentos, avaliar experiências e tomar decisões informadas sobre onde comer ou comprar alimentos.  
São preocupados com a segurança alimentar e valorizam filtros por tipo de comida, alertas sobre locais problemáticos, denúncias com fotos e sistemas de recomendação baseados em localização e preferências.

---

# Escopo

## 2.1 Escopo Específico

### 2.1.1 Requisitos Funcionais
- **RF-001 - Cadastro e Login**  
  Permitir criação e autenticação de contas para usuários e responsáveis por estabelecimentos. **Prioridade: Alta**

- **RF-002 - Listagem e Pesquisa**  
  Exibir estabelecimentos com opções de busca por nome, tipo, localização e avaliação. **Prioridade: Alta**

- **RF-003 - Sistema de Avaliação**  
  Habilitar usuários para avaliar com notas e comentários, gerando uma média pública. **Prioridade: Alta**

- **RF-004 - Histórico e Rankings**  
  Apresentar o histórico de avaliações e gerar rankings dos estabelecimentos. **Prioridade: Média**

- **RF-005 - Painel Administrativo**  
  Área restrita para moderação de conteúdo e revisão de denúncias. **Prioridade: Média**

### 2.1.2 Requisitos Não Funcionais
- **RNF-001 - Responsividade**  
  O sistema deve se adaptar a diferentes dispositivos e tamanhos de tela. **Prioridade: Alta**

- **RNF-002 - Anti-Spam**  
  Implementar mecanismos para evitar registros duplicados e avaliações falsas. **Prioridade: Alta**

- **RNF-003 - Integridade dos Dados**  
  Garantir a confiabilidade dos dados com trilhas de auditoria e controle de acesso. **Prioridade: Alta**

- **RNF-004 - Backup dos Dados**  
  Realizar cópias de segurança automáticas e diárias para prevenir perda de informações. **Prioridade: Média**

### 2.1.3 Regras de Negócio
- **RN-001 - Avaliação Restrita**  
  Apenas usuários cadastrados e autenticados podem avaliar estabelecimentos. **Prioridade: Alta**

- **RN-002 - Frequência de Avaliação**  
  Um usuário só pode avaliar o mesmo estabelecimento uma vez a cada 30 dias. **Prioridade: Alta**

---

## 2.2 Escopo Futuro

### 2.2.1 Requisitos Funcionais
- **RF-F01 - Denúncias de Qualidade Alimentar**  
  Permitir que consumidores registrem relatos e denúncias sobre problemas como má higiene ou alimentos vencidos. (Relacionado à H3)

- **RF-F02 - Alertas de Estabelecimentos Problemáticos**  
  Enviar notificações para usuários sobre locais denunciados ou com avaliações negativas. (Relacionado à H5)

- **RF-F03 - Recomendação Personalizada**  
  Oferecer sugestões de estabelecimentos com base no histórico de avaliações e preferências do usuário. (Relacionado à H6)

- **RF-F04 - Edição de Perfil do Usuário**  
  Permitir que o usuário edite seus dados pessoais. (Relacionado à H8)

- **RF-F05 - Exclusão de Conta**  
  Permitir que o usuário exclua sua conta do sistema. (Relacionado à H9)

- **RF-F06 - Mapa com Localização de Estabelecimentos**  
  Exibir um mapa interativo com a geolocalização dos estabelecimentos cadastrados. (Relacionado à H10)

- **RF-F07 - Atualização de Perfil do Estabelecimento**  
  Donos de estabelecimentos podem atualizar informações e imagens de seus perfis. (Relacionado à H12)

- **RF-F08 - Divulgação de Certificados Sanitários**  
  Permitir que estabelecimentos publiquem certificados de boas práticas de higiene. (Relacionado à H13)

- **RF-F09 - Histórico de Usuários para Moderação**  
  Fornecer ferramenta para moderadores visualizarem o histórico de comportamento dos usuários. (Relacionado à H16)

### 2.2.2 Requisitos Não Funcionais
- **RNF-F01 - Segurança da Informação nas Denúncias**  
  As denúncias e relatos enviados pelos usuários devem ser armazenados de forma segura, com criptografia e anonimato opcional, para proteger a identidade dos denunciantes.

- **RNF-F02 - Personalização com Privacidade**  
  O sistema deve oferecer recomendações personalizadas sem expor ou compartilhar dados sensíveis dos usuários com terceiros.

- **RNF-F03 - Performance do Mapa**  
  O carregamento do mapa com estabelecimentos deve ocorrer em até 2 segundos em conexões padrão (4G/Wi-Fi), garantindo boa experiência em dispositivos móveis.

- **RNF-F04 - Acessibilidade**  
  As funcionalidades de denúncias, mapa e certificados devem ser acessíveis para usuários com deficiência, seguindo diretrizes WCAG 2.1 (nível AA).

- **RNF-F05 - Validação de Certificados**  
  O sistema deve verificar automaticamente a autenticidade dos certificados sanitários divulgados pelos estabelecimentos, consultando bases de dados oficiais.

- **RNF-F06 - Logs de Ações de Moderação**  
  Todas as ações realizadas por moderadores (ex: remoção de denúncias, bloqueios) devem ser registradas em logs com data, hora e identificação do moderador.

### 2.2.3 Regras de Negócio
- **RN-F01 - Análise Prévia de Denúncias**  
  As denúncias feitas por usuários deverão passar por validação antes de serem exibidas publicamente. (Relacionado à H15)

- **RN-F02 - Exibição Condicional de Certificados**  
  Certificados sanitários só poderão ser exibidos mediante verificação da validade e autenticidade. (Relacionado à H13)

---

# 3. Diagramas UML

## 3.1 Casos de Uso
![Diagrama de Caso de Uso](UML/Caso%20de%20uso.drawio.png)

## 3.2 Classes
![Diagrama de Classes](UML/UML%20Classes.png)
