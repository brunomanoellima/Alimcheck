
# 🍽️ **Projeto Alimcheck**

## 📌 1.1 Nome do Projeto  
**Alimcheck**

---

## 📖 1.2 Descrição do Produto  
O **Alimcheck** é uma aplicação **web + mobile** que permite à população de Itacoatiara **avaliar, recomendar e alertar** sobre a qualidade dos alimentos e estabelecimentos da cidade.  
🎯 **Objetivo**: Facilitar escolhas **mais seguras e conscientes** através de avaliações e recomendações colaborativas.

---

## 🎯 1.3 Objetivo  
Desenvolver um **app mobile** para que os moradores de Itacoatiara:  
- Avaliem a qualidade dos alimentos em feiras, restaurantes e comércios 🛍️  
- Consultem as avaliações de outros usuários 👥  
- Tomem decisões **seguras e informadas** sobre onde comer 🍲  

---

## 💡 1.4 Motivação  
A **segurança alimentar** é um tema fundamental para a saúde pública. Em Itacoatiara, onde o consumo de alimentos em feiras e comércios locais é parte importante da cultura, a falta de transparência coloca a população em risco.  

✨ **Alimcheck** visa:  
- Empoderar cidadãos com informações confiáveis 📢  
- Incentivar **boas práticas de higiene** em estabelecimentos 🧼  
- Criar uma rede comunitária de confiança 🤝  
- Apoiar políticas públicas mais eficazes 🏛️  

---

## 👩‍💻 1.5 Equipe de Desenvolvimento  
- **Bruno** | **Carlos** | **Cíntia** | **Francisco** | **Nélio**

---

## 👥 1.6 Usuários Finais  

**👩‍💼 Moderadores**  
- Usuários de computador 🖥️  
- Gerenciam **dashboards, alertas automáticos e filtros** para moderação rápida.

**👨‍🍳 Donos de Estabelecimentos**  
- Usam celular 📱 ou PC 💻  
- Monitoram avaliações ⭐, publicam certificados 📜 e respondem a clientes.

**👩‍🏫 Consumidores**  
- Procuram lugares para comer 🥗  
- Avaliam experiências 📝  
- Valorizam **denúncias com fotos, alertas e recomendações personalizadas**.

---

# 🎯 2. Escopo

## 🚀 2.1 Escopo Específico

### 🔑 Requisitos Funcionais  
- **RF-001 - Cadastro e Login** ✅ (Alta)  
- **RF-002 - Listagem e Pesquisa** 🔍 (Alta)  
- **RF-003 - Sistema de Avaliação** ⭐ (Alta)  
- **RF-004 - Histórico e Rankings** 📊 (Média)  
- **RF-005 - Painel Administrativo** 🛡️ (Média)  

### 🛡️ Requisitos Não Funcionais  
- **RNF-001 - Responsividade** 📱 (Alta)  
- **RNF-002 - Anti-Spam** 🚫 (Alta)  
- **RNF-003 - Integridade dos Dados** 🔒 (Alta)  
- **RNF-004 - Backup Diário** ☁️ (Média)  

### ⚖️ Regras de Negócio  
- **RN-001 - Avaliação Restrita** 🔑 (Alta)  
- **RN-002 - Frequência de Avaliação** ⏳ (Alta)  

---

## 🌟 2.2 Escopo Futuro  

### 🔮 Funcionalidades Planejadas  
- **RF-F01 - Denúncias de Qualidade Alimentar** 🚨  
- **RF-F02 - Alertas de Locais Problemáticos** ⚠️  
- **RF-F03 - Recomendação Personalizada** 🤖  
- **RF-F06 - Mapa Interativo** 🗺️  
- **RF-F08 - Divulgação de Certificados Sanitários** 📜  

### 🛡️ Requisitos Não Funcionais  
- **RNF-F01 - Denúncias Seguras e Criptografadas** 🔐  
- **RNF-F03 - Mapa em até 2s** ⚡  
- **RNF-F04 - Acessibilidade (WCAG 2.1 AA)** ♿  

### ⚖️ Regras de Negócio Futuras  
- **RN-F01 - Análise Prévia de Denúncias** 🕵️  
- **RN-F02 - Certificados Só Após Validação** ✅  

---

# 📊 3. Diagramas UML  

## 🎭 3.1 Casos de Uso  
![Diagrama de Caso de Uso](UML/Caso%20de%20uso.drawio.png)

## 🏗️ 3.2 Classes  
![Diagrama de Classes](UML/UML%20Classes.png)

---

## 💻 4. Como Rodar o Projeto

### 🛠️ Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (se for o app mobile)
- [MongoDB](https://www.mongodb.com/) (ou outro banco de dados de sua escolha)

### 🔧 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seuusuario/alimcheck.git
    cd alimcheck
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Para rodar o app web:
    ```bash
    npm start
    ```

4. Para rodar o app mobile (em ambiente Android, por exemplo):
    ```bash
    npx react-native run-android
    ```

### 🌐 Acesso Web
- O acesso web está disponível em [www.alimcheck.com.br](http://www.alimcheck.com.br).

---

## 📚 5. Contribuição

Se você deseja contribuir para o desenvolvimento do Alimcheck, siga estas etapas:

1. Faça um **fork** do repositório.
2. Crie uma nova **branch** para sua feature:
    ```bash
    git checkout -b minha-feature
    ```
3. Realize suas modificações e **commit**:
    ```bash
    git commit -am 'Adiciona nova funcionalidade'
    ```
4. Faça o **push** para o repositório:
    ```bash
    git push origin minha-feature
    ```
5. Abra um **pull request** para a branch principal.

---

## ⚖️ 6. Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Arquitetura Componentizada - Alimcheck

Aqui está a arquitetura do projeto representada em **Mermaid**:

```mermaid
flowchart TB
  subgraph UI[Camada de Apresentacao]
    WEB[Web App (React)]
    MOB[Mobile App (React Native)]
  end

  subgraph BE[Backend - Servicos de Negocio (Node.js)]
    API[API Gateway/Router]
    AUTH[Autenticacao & Perfis]
    CAT[Catalogo & Busca]
    REV[Avaliacoes & Rankings]
    NOTI[Gateway de Notificacoes]
    GEO[Adapter Geolocalizacao/Mapas]
  end

  subgraph DB[Camada de Dados]
    MONGO[(MongoDB)]
    STORAGE[(Cloud Storage - Fotos)]
  end

  subgraph EXT[Servicos Externos]
    FCM[Firebase/OneSignal]
    SEND[SendGrid]
    TW[Twilio]
    MAPS[Google Maps / Mapbox]
  end

  subgraph FUT["Modulos Futuros"]
    style FUT stroke-dasharray: 5 5
    DEN[Denuncias & Alertas Locais]
    REC[Recomendacao Personalizada (IA)]
  end

  WEB --> API
  MOB --> API
  API --> AUTH
  API --> CAT
  API --> REV
  API --> NOTI
  API --> GEO
  AUTH --> MONGO
  CAT --> MONGO
  REV --> MONGO
  REV --> STORAGE
  CAT --> STORAGE
  NOTI --> FCM
  NOTI --> SEND
  NOTI --> TW
  GEO --> MAPS
  API -.-> DEN
  API -.-> REC
