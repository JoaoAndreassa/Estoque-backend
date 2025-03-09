# 📦 Sistema de Controle de Estoque

Este é um sistema de controle de estoque desenvolvido em **Node.js** com **Express**, **Prisma** e **MySQL**. Ele permite gerenciar **produtos**, **usuários** e **movimentações de estoque** (entrada e saída de produtos).


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


## 📌 Como Rodar o Projeto

### **1. Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### **2. Instalar Dependências**
```sh
npm install
```

### **3. Importar o Dump no Banco de Dados**

#### Criar o banco de dados
Antes de importar, certifique-se de que o banco de dados existe. Caso contrário, crie-o com:
```sh
 mysql -u root -p -e "CREATE DATABASE estoque;"
```
### **4 Importar o banco de dados**
Rode o comando:
```sh
mysql -u root -p estoque < dump.sql
```


### **5. Confirmar se os Dados Foram Importados**
Após importar o dump, abra o MySQL e verifique se os dados estão lá:
```sh
mysql -u root -p
```
Depois, execute:

```sh
USE estoque;
SHOW TABLES;
SELECT * FROM produtos; -- Exemplo para visualizar os produtos
```



### **6. Configurar as Variáveis de Ambiente**
Crie um arquivo .env na raiz do projeto e configure as credenciais do banco de dados e o segredo JWT:

```sh
DATABASE_URL="mysql://root:senha@localhost:3306/estoque"
JWT_SECRET="seu_segredo_super_secreto"
PORT=3000
```

### **4️. Configurar o Banco de Dados**

```sh
npx prisma migrate dev --name init
```

### **5️. Rodar o Servidor**
```sh
npx ts-node src/app.ts

```


**Se tudo estiver correto, a API rodará em:**
```sh
http://localhost:3000
```


## 🔑 Autenticação (JWT)
Para acessar rotas protegidas, envie um **token JWT** no **header** da requisição:

```makefile
Authorization: Bearer SEU_TOKEN_AQUI
```



