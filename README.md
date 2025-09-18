# 🍽️ **Projeto Alimcheck**

## 📌 1.1 Nome do Projeto  
**Alimcheck**

---

## 📖 1.2 Descrição do Produto  
O **Alimcheck** é uma aplicação **web** que permite à população de Itacoatiara **avaliar, recomendar e alertar** sobre a qualidade dos alimentos e estabelecimentos da cidade.  
🎯 **Objetivo**: Facilitar escolhas **mais seguras e conscientes** através de avaliações e recomendações colaborativas.

---

## 🎯 1.3 Objetivo  
Desenvolver uma **aplicação web** para que os moradores de Itacoatiara:  
- Avaliem a qualidade dos alimentos em feiras, restaurantes e comércios 🛍️  
- Consultem avaliações de outros usuários 👥  
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
- **Bruno Manoel**  
- **Carlos Eduardo**  
- **Cíntia Seixas**  
- **Francisco Neto**  
- **Nélio Tobias**

---

## 👥 1.6 Usuários Finais  

**👩‍💼 Moderadores**  
- Usam computador 🖥️  
- Precisam de **dashboards, alertas automáticos e filtros** para moderação rápida.

**👨‍🍳 Donos de Estabelecimentos**  
- Usam celular 📱 ou PC 💻  
- Monitoram avaliações ⭐, gerenciam estabelecimentos e respondem a clientes.

**👩‍🏫 Consumidores**  
- Usam celular 📱 ou PC 💻  
- Procuram lugares para comer 🥗  
- Avaliam experiências 📝  
- Valorizam **denúncias com fotos, alertas e recomendações personalizadas**.

---

# 🎯 2. Escopo

## 🚀 2.1 Escopo Específico

### 🔑 Requisitos Funcionais  
- **RF-01 - Cadastro e Login** ✅ (Alta)  
- **RF-02 - Listagem e Pesquisa** 🔍 (Alta)  
- **RF-03 - Sistema de Avaliação** ⭐ (Alta)  
- **RF-04 - Histórico e Rankings** 📊 (Média)  
- **RF-05 - Painel Administrativo** 🛡️ (Média)  

### 🛡️ Requisitos Não Funcionais  
- **RNF-01 - Responsividade** 📱 (Alta)  
- **RNF-02 - Anti-Spam** 🚫 (Alta)  
- **RNF-03 - Integridade dos Dados** 🔒 (Alta)  
- **RNF-04 - Backup Diário** ☁️ (Média)  

### ⚖️ Regras de Negócio  
- **RN-01 - Avaliação Restrita (apenas usuários autenticados podem avaliar)** 🔑 (Alta)  
- **RN-02 - Frequência de Avaliação (limite de 1x por dia)** ⏳ (Alta)  

---

## 🌟 2.2 Escopo Futuro  

### 🔮 Funcionalidades Planejadas  
- **RF-06 - Denúncias de Qualidade Alimentar** 🚨  
- **RF-07 - Recomendação Personalizada** 🤖  
- **RF-08 - Mapa Interativo de Estabelecimentos** 🗺️  
- **RF-09 - Divulgação de Certificados Sanitários** 📜  

### 🛡️ Requisitos Não Funcionais  
- **RNF-05 - Denúncias Seguras e Criptografadas** 🔐  
- **RNF-06 - Acessibilidade (WCAG 2.1 AA)** ♿  
- **RNF-07 - Tempo de Resposta do Mapa ≤ 2s** ⚡  

### ⚖️ Regras de Negócio Futuras  
- **RN-03 - Denúncias devem passar por análise prévia** 🕵️  
- **RN-04 - Certificados só podem ser divulgados após validação** ✅  

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
- [MongoDB](https://www.mongodb.com/) (ou outro banco de dados de sua escolha)  

### 🚀 Executando
```bash
# Clonar o repositório
git clone https://github.com/seuusuario/alimcheck.git

# Acessar a pasta do projeto
cd alimcheck

# Instalar dependências
npm install

# Rodar aplicação
npm start
