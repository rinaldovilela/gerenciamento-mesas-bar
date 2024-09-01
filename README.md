
# Projeto de Gerenciamento de Mesas de Bar

Este projeto é uma aplicação de gerenciamento de mesas para um bar, que inclui funcionalidades para adicionar itens à comanda, imprimir a comanda e limpar a comanda. O sistema é dividido em um frontend desenvolvido com Next.js e TypeScript, e um backend em Node.js com Express. A impressão é feita usando PDFs gerados com `pdfkit` e impressos com `pdf-to-printer`.

## Estrutura do Projeto

- **Frontend**: Desenvolvido com Next.js e TypeScript. Utiliza Tailwind CSS para estilização.
- **Backend**: Desenvolvido com Node.js e Express. Utiliza `pdfkit` para gerar PDFs e `pdf-to-printer` para impressão.

## Funcionalidades

- Adicionar itens à comanda de uma mesa
- Imprimir a comanda em formato PDF
- Limpar a comanda de uma mesa

## Instalação

### Backend

1. Navegue até o diretório do backend:

   ```bash
   cd server
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um diretório para arquivos temporários:

   ```bash
   mkdir temp
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

### Frontend

1. Navegue até o diretório do frontend:

   ```bash
   cd src
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o frontend:

   ```bash
   npm run dev
   ```

## Endpoints da API

### `/mesas`

- **GET**: Obtém todas as mesas.
- **POST**: Cria uma nova mesa.

### `/comandas/:mesaId/itens`

- **POST**: Adiciona um item à comanda de uma mesa específica.

### `/impressao`

- **POST**: Imprime a comanda da mesa especificada.

### `/limparComanda`

- **POST**: Limpa a comanda da mesa especificada.

## Estrutura de Arquivos

- `server/`
  - `index.js`: Configuração do servidor e rotas.
  - `routes/`
    - `mesas.js`: Rotas para gerenciar mesas.
    - `comandas.js`: Rotas para gerenciar comandas.
    - `impressao.js`: Rotas para impressão de comandas.
  - `models/`
    - `mesa.js`: Modelo de dados para mesas.
    - `comanda.js`: Modelo de dados para comandas.
  - `utils/`
    - `printer.js`: Funções para gerar e imprimir PDFs.

- `src/`
  - `components/`
    - `Comanda.tsx`: Componente para visualizar e gerenciar a comanda.

## Tecnologias Utilizadas

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, PDFKit, pdf-to-printer
- **Banco de Dados**: Em memória (não persistido)

## Contribuições

Contribuições são bem-vindas! Por favor, abra um pull request ou crie uma issue para discutir qualquer nova funcionalidade ou correção de bug.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

## Contato

Se você tiver alguma dúvida, por favor entre em contato com [seu-email@example.com](mailto:seu-email@example.com).
```

### Como usar

- **Backend**: Execute o servidor backend e garanta que ele esteja rodando na porta `5000`.
- **Frontend**: Execute o frontend e acesse a aplicação na porta onde o Next.js está configurado.

Esse README cobre a estrutura do projeto, como instalar e executar o backend e o frontend, e fornece uma visão geral das funcionalidades e endpoints disponíveis. Adapte conforme necessário para refletir quaisquer detalhes específicos do seu projeto.