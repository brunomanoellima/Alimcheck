-- Passo 1: Apaga o banco de dados existente para garantir um começo limpo.
DROP DATABASE IF EXISTS alimcheck_db;

-- Passo 2: Cria o banco de dados novamente com o padrão de caracteres recomendado.
CREATE DATABASE alimcheck_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Passo 3: Seleciona o banco de dados para usar nos comandos seguintes.
USE alimcheck_db;


-- -----------------------------------------------------
-- Tabela usuarios (Versão Limpa)
-- -----------------------------------------------------
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ativo',
  avaliacoes_excluidas INT NOT NULL DEFAULT 0,
  avatar_url TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UNIQUE (email)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela categorias
-- -----------------------------------------------------
CREATE TABLE categorias (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome_UNIQUE (nome)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela estabelecimentos
-- -----------------------------------------------------
CREATE TABLE estabelecimentos (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(255) NULL,
  imagem_url TEXT NULL,
  dono_id INT NOT NULL,
  categoria_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_estabelecimentos_dono_idx (dono_id ASC),
  INDEX fk_estabelecimentos_categoria_idx (categoria_id ASC),
  CONSTRAINT fk_estabelecimentos_dono
    FOREIGN KEY (dono_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_estabelecimentos_categoria
    FOREIGN KEY (categoria_id)
    REFERENCES categorias (id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela clientes
-- -----------------------------------------------------
CREATE TABLE clientes (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  data_cadastro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY usuario_id_UNIQUE (usuario_id),
  CONSTRAINT fk_clientes_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela donos_estabelecimento
-- -----------------------------------------------------
CREATE TABLE donos_estabelecimento (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  data_cadastro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY usuario_id_UNIQUE (usuario_id),
  CONSTRAINT fk_donos_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela administradores
-- -----------------------------------------------------
CREATE TABLE administradores (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  data_cadastro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY usuario_id_UNIQUE (usuario_id),
  CONSTRAINT fk_admin_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela avaliacoes
-- -----------------------------------------------------
CREATE TABLE avaliacoes (
  id INT NOT NULL AUTO_INCREMENT,
  nota INT NOT NULL,
  comentario TEXT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT NOT NULL,
  estabelecimento_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_avaliacoes_usuario_idx (usuario_id ASC),
  INDEX fk_avaliacoes_estabelecimento_idx (estabelecimento_id ASC),
  CONSTRAINT fk_avaliacoes_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_avaliacoes_estabelecimento
    FOREIGN KEY (estabelecimento_id)
    REFERENCES estabelecimentos (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela denuncias
-- -----------------------------------------------------
CREATE TABLE denuncias (
  id INT NOT NULL AUTO_INCREMENT,
  avaliacao_id INT NOT NULL,
  usuario_id INT NOT NULL,
  motivo TEXT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX fk_denuncias_avaliacao_idx (avaliacao_id ASC),
  INDEX fk_denuncias_usuario_idx (usuario_id ASC),
  CONSTRAINT fk_denuncias_avaliacao
    FOREIGN KEY (avaliacao_id)
    REFERENCES avaliacoes (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_denuncias_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Tabela respostas_dono
-- -----------------------------------------------------
CREATE TABLE respostas_dono (
  id INT NOT NULL AUTO_INCREMENT,
  resposta TEXT NOT NULL,
  avaliacao_id INT NOT NULL,
  dono_id INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX uk_avaliacao_id (avaliacao_id ASC),
  INDEX fk_respostas_avaliacao_idx (avaliacao_id ASC),
  INDEX fk_respostas_dono_idx (dono_id ASC),
  CONSTRAINT fk_respostas_avaliacao
    FOREIGN KEY (avaliacao_id)
    REFERENCES avaliacoes (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_respostas_dono
    FOREIGN KEY (dono_id)
    REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Dados Iniciais
-- -----------------------------------------------------
INSERT INTO categorias (nome) VALUES
('Brasileira'),
('Italiana'),
('Japonesa'),
('Hamburgueria'),
('Pizzaria'),
('Saudável'),
('Cafeteria');