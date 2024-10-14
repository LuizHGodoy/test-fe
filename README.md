# Documentação do Projeto

## Instalação e Execução do Projeto

Este guia fornece instruções sobre como instalar e executar o projeto localmente.

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)

- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/) (gerenciador de pacotes)

### Passos para Instalação

1. **Clone o repositório**

   Abra o terminal e execute o seguinte comando para clonar o repositório:

      ```bash 
      git clone https://github.com/LuizHGodoy/teste-pax-primavera-fe.git
      ```
      
2. **Navegue até o diretório do projeto**

    ```bash 
      cd teste-pax-primavera-fe
    ```

3. **Instale as dependências**

    ```bash 
      yarn install
    ```
    
   Ou, se estiver usando o npm:
   ```bash
      npm install
   ```
   
### Configuração do Ambiente

1. **Crie um arquivo `.env.local`**

   Copie o arquivo de exemplo `.env.example` para `.env.local` e configure as variáveis de ambiente necessárias.
   
   ```bash
      cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` para incluir suas configurações, como a URL da API.
   
### Execução do Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
yarn dev
```

Ou, se estiver usando o npm:

```bash
npm run dev
```

O projeto será executado em `http://localhost:3000`.

### Compilação para Produção

Para compilar o projeto para produção, execute:
```bash
yarn build
```

Ou, se estiver usando o npm:
```bash
npm run build
```

Após a compilação, você pode iniciar o servidor de produção com:
```bash
yarn start
```

Ou, se estiver usando o npm:
```bash
npm run start
```

## Estrutura do Projeto

```
/src
│
├── /app
│   ├── /auth
│   │   ├── /recovery
│   │   │   └── page.tsx
│   │   ├── /sign-up
│   │   │   └── page.tsx
│   │   └── /sign-in
│   │       └── page.tsx
│   │
│   ├── /clientes
│   │   └── page.tsx
│   │
│   ├── /perfil
│   │   └── page.tsx
│   │
│   ├── /planos
│   │   └── page.tsx
│   │
│   ├── /servicos-adicionais
│   │   └── page.tsx
│   │
│   ├── /vendas
│   │   └── page.tsx
│   │
│   └── /page.tsx
│
├── /components
│   ├── /ui
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── toast.tsx
│   │
│   ├── /create-client-form.tsx
│   ├── /create-plans-form.tsx
│   ├── /create-service-form.tsx
│   ├── /clientes-table.tsx
│   ├── /planos-table.tsx
│   ├── /vendas-table.tsx
│   └── /columns.tsx
│
├── /services
│   ├── /api
│   │   ├── clients.ts
│   │   ├── plans.ts
│   │   └── aditional-services.ts
│   │
│   └── index.ts
│
├── /common
│   ├── /utils
│   │   ├── masks.ts
│   │   ├── validationZod.ts
│   │   └── validators.ts
│   │
│   └── /exceptions
│       └── api-error.ts
│
├── /public
│   └── /fonts
│       ├── GeistVF.woff
│       └── GeistMonoVF.woff
│
├── /styles
│   └── globals.css
│
└── package.json
```

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Next.js**: Framework React para desenvolvimento de aplicações web, que permite renderização do lado do servidor e geração de sites estáticos.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, melhorando a qualidade do código e a experiência de desenvolvimento.
- **Tailwind CSS**: Framework CSS utilitário que permite estilizar componentes de forma rápida e responsiva.
- **Axios**: Biblioteca para fazer requisições HTTP, utilizada para interagir com APIs.

### Ferramentas e Bibliotecas Adicionais

- **Zod**: Biblioteca para validação de esquemas de dados, utilizada para garantir que os dados atendam a certos critérios.
- **Recharts**: Biblioteca para criar gráficos e visualizações de dados em React.
- **Zustand**: Biblioteca para gerenciamento de estado e requisições assíncronas, facilitando o fetch de dados e o gerenciamento de cache.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React, que simplifica a manipulação de estados e validações.

### Utilitários

- **date-fns**: Biblioteca para manipulação de datas, utilizada para formatar e validar datas.
- **shadcn/ui**: Componentes shadcn/ui lindamente projetados que você pode copiar e colar em seus aplicativos.

Essas tecnologias trabalham juntas para criar uma aplicação web moderna, escalável e de fácil manutenção.

## Licença

This project is not licensed for public use. All rights reserved.
