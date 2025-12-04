# 🧱 Padrão de Projeto: Singleton

## 🧩 1. Contextualização Inicial
Em muitos sistemas existe um recurso que deve ter **uma única instância global** compartilhada: configuração da aplicação, logger, gerenciador de conexões, cache, entre outros.  
Criar múltiplas instâncias pode gerar inconsistência e desperdício de recursos.  
O **padrão Singleton** surgiu para **garantir que apenas um objeto dessa classe exista em todo o sistema**, oferecendo um ponto de acesso global a ele.

---

## 📖 2. Definição do Padrão
O **Singleton** é um **padrão de criação** que **restringe a classe a uma única instância** e **fornece um ponto de acesso global** a ela.  

**Características principais:**
- Construtor **privado**, impedindo que outras classes criem objetos diretamente.  
- Um campo **estático** que armazena a instância única.  
- Um método **estático** (`getInstance`) que retorna essa instância, criando-a se ainda não existir.

---

## 🧠 3. Qual Problema Resolve
O Singleton resolve o problema de se ter **múltiplas instâncias de um mesmo recurso global**.  
Ele evita inconsistências e duplicações de estado, garantindo que apenas **um ponto centralizado** controle o comportamento.

**Problemas solucionados:**
- Evita múltiplas configurações conflitantes.  
- Garante consistência em logs, conexões e dados compartilhados.  
- Controla o acesso concorrente a recursos únicos.

---

## 💡 4. Onde Pode Ser Aplicado
O padrão Singleton pode ser aplicado em diversas situações reais, como:

- **Logger** central de sistema.  
- **Gerenciador de Configurações** da aplicação.  
- **Pool de conexões** com o banco de dados.  
- **Cache global** ou **gerenciador de sessão**.  
- **Spool de impressão** ou **controlador de tema** em interfaces gráficas.  

---

## 🧭 5. Representação UML (Diagrama de Classes)
<img width="149" height="102" alt="image" src="https://github.com/user-attachments/assets/2b3be9e4-4436-442d-a373-b7f4d65e075c" />


## 🧭 6. Exemplo de Código Orientado a Objetos (Java)

🟢 Versão Simples (Eager Initialization)
```java
public final class ConfigManager {
    private static final ConfigManager INSTANCE = new ConfigManager();
    private Properties props;

    private ConfigManager() {
        props = new Properties();
        props.setProperty("env", "prod");
    }

    public static ConfigManager getInstance() {
        return INSTANCE;
    }

    public String get(String key) {
        return props.getProperty(key);
    }
}


🟣 Versão Lazy Thread-Safe (Double-Checked Locking)
public final class Logger {
    private static volatile Logger instance;

    private Logger() { }

    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) {
                    instance = new Logger();
                }
            }
        }
        return instance;
    }

    public void log(String msg) {
        System.out.println("[APP] " + msg);
    }
}

🧪 Uso
public class Main {
    public static void main(String[] args) {
        ConfigManager cfg = ConfigManager.getInstance();
        System.out.println(cfg.get("env"));

        Logger logger = Logger.getInstance();
        logger.log("Iniciou a aplicação");
    }
}
