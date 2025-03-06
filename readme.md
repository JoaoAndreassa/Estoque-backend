# 📦 Sistema de Controle de Estoque

Este é um sistema de controle de estoque desenvolvido em **Node.js** com **Express**, **Prisma** e **MySQL**. Ele permite gerenciar **produtos**, **usuários** e **movimentações de estoque** (entrada e saída de produtos).

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

### **🖥️ Backend**
- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript no servidor.
- **[Express.js](https://expressjs.com/)** - Framework minimalista para criação de APIs.
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para interagir com o banco de dados.
- **[MySQL](https://www.mysql.com/)** - Banco de dados relacional utilizado no projeto.

### **🔒 Autenticação & Segurança**
- **[JWT (JSON Web Token)](https://jwt.io/)** - Implementação de autenticação segura.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Biblioteca para criptografar senhas.

### **📊 Validação & Middleware**
- **[Zod](https://zod.dev/)** - Validação de dados de entrada para as requisições.
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente.
- **[CORS](https://www.npmjs.com/package/cors)** - Permite o acesso à API de diferentes domínios.

### **🛠 Ferramentas de Desenvolvimento**
- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript para tipagem estática.
- **[Ts-Node](https://www.npmjs.com/package/ts-node)** - Permite rodar TypeScript diretamente no Node.js.
- **[ESLint](https://eslint.org/)** - Linter para garantir boas práticas no código.
- **[Nodemon](https://www.npmjs.com/package/nodemon)** - Monitora mudanças no código e reinicia o servidor automaticamente.

---

📌 **Essas tecnologias garantem um backend robusto, seguro e de alta performance!**


---

## 📌 Como Rodar o Projeto

### **1️⃣ Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### **2️⃣ Instalar Dependências**
```sh
npm install
```

### **3️⃣ Configurar as Variáveis de Ambiente**
Crie um arquivo .env na raiz do projeto e configure as credenciais do banco de dados e o segredo JWT:

```sh
DATABASE_URL="mysql://root:senha@localhost:3306/estoque"
JWT_SECRET="seu_segredo_super_secreto"
PORT=3000
```

### **4️⃣ Criar e Configurar o Banco de Dados**

```sh
npx prisma migrate dev --name init
```

### **5️⃣ Rodar o Servidor**
```sh
npx ts-node src/app.ts

```


**Se tudo estiver correto, a API rodará em:**
```sh
http://localhost:3000
```

## 🔥 Rotas da API

### 🧑‍💻 Autenticação de Usuário
| Método  | Rota                | Descrição                          |
|---------|---------------------|----------------------------------|
| **POST** | `/api/users/signup`  | Criar um novo usuário            |
| **POST** | `/api/users/login`   | Autenticar e obter um token      |
| **GET**  | `/api/users/profile` | Obter perfil do usuário (Autenticado) |

---

### 📦 Produtos
| Método  | Rota                   | Descrição                         |
|---------|------------------------|---------------------------------|
| **POST** | `/api/produtos`        | Criar um novo produto (Autenticado) |
| **GET**  | `/api/produtos`        | Listar todos os produtos        |
| **GET**  | `/api/produtos/:id`    | Obter detalhes de um produto    |
| **PUT**  | `/api/produtos/:id`    | Atualizar um produto (Autenticado) |
| **DELETE** | `/api/produtos/:id`  | Deletar um produto (Autenticado) |

---

### 📊 Controle de Estoque
| Método  | Rota                     | Descrição                              |
|---------|--------------------------|--------------------------------------|
| **POST** | `/api/estoque/entrada`   | Registrar entrada de produto (Autenticado) |
| **POST** | `/api/estoque/saida`     | Registrar saída de produto (Autenticado) |
| **GET**  | `/api/estoque`           | Listar movimentações de estoque |

## 🔑 Autenticação (JWT)
Para acessar rotas protegidas, envie um **token JWT** no **header** da requisição:

```makefile
Authorization: Bearer SEU_TOKEN_AQUI
```



