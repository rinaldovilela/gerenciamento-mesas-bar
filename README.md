Aqui está a documentação e um exemplo de um README moderno e atrativo para o seu projeto de gerenciamento de mesas. O README contém seções importantes como Introdução, Instalação, Uso e Contribuição, que fornecem uma visão geral clara e informações úteis para desenvolvedores e usuários que desejam utilizar ou contribuir para o projeto.

---

# **Gerenciamento de Mesas de Bar**

## **📋 Introdução**
Bem-vindo ao projeto de **Gerenciamento de Mesas de Bar**, uma aplicação moderna e eficiente projetada para auxiliar bares e restaurantes a gerenciarem mesas, comandas e pedidos de forma simplificada. Este projeto utiliza tecnologias como **Next.js**, **Node.js**, **Express.js**, e **Tailwind CSS** para criar uma experiência de usuário fluida e um backend robusto. A novidade neste projeto é a integração com **PDFKit** para geração de PDFs das comandas e **pdf-to-printer** para impressão direta em impressoras térmicas.

---

## **🚀 Funcionalidades**
- **Gestão de Mesas:** Criação, visualização e gerenciamento de mesas.
- **Comandas:** Adição de itens à comanda e cálculo automático do total.
- **Geração de PDFs:** Criação automática de PDFs das comandas usando **PDFKit**.
- **Impressão Direta:** Envio dos PDFs para impressão em impressoras térmicas utilizando **pdf-to-printer**.
- **Interface Intuitiva:** Layout responsivo e fácil de usar para o gerenciamento de mesas e pedidos.

---

## **📦 Instalação**

### **Pré-requisitos**
- **Node.js** (v14 ou superior)
- **npm** (v6 ou superior)

### **Passo a Passo**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/mesa-gerenciamento.git
   cd mesa-gerenciamento
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale as novas dependências necessárias para impressão:**
   ```bash
   npm install pdfkit pdf-to-printer
   ```

4. **Configure a impressora:**
   - Certifique-se de que a sua impressora térmica esteja conectada e configurada no sistema operacional.

5. **Inicie o servidor:**
   ```bash
   npm start
   ```
   O servidor será iniciado na porta `5000`. Acesse `http://localhost:5000` para verificar se está funcionando corretamente.

---

## **📝 Uso**

### **1. Adicionando uma nova mesa**
Para adicionar uma nova mesa, envie uma requisição POST para `/mesas`. A nova mesa será criada com um ID único e uma comanda vazia.

### **2. Adicionando itens à comanda**
Para adicionar itens a uma comanda específica, envie uma requisição POST para `/comandas/:mesaId/itens`, onde `:mesaId` é o ID da mesa.

### **3. Gerando e imprimindo a comanda**
Para gerar um PDF da comanda e enviá-lo para a impressora, envie uma requisição POST para `/impressao` com o `mesaId` no corpo da requisição.

### **4. Limpando a comanda**
Após imprimir, a comanda pode ser limpa para uma nova utilização, enviando uma requisição para `/limparComanda`.

---

## **💻 Estrutura do Projeto**

```plaintext
mesa-gerenciamento/
├── node_modules/
├── public/
├── server/
│   ├── routes/
│   │   ├── mesas.js           # Rotas para gerenciamento de mesas
│   │   ├── comandas.js        # Rotas para gerenciamento de comandas
│   │   ├── impressao.js       # Rota para impressão de comandas
│   │   └── limparComanda.js   # Rota para limpar comandas
│   ├── models/
│   │   ├── mesa.js            # Modelo de dados das mesas
│   │   └── comanda.js         # Modelo de dados das comandas
│   └── utils/
│       └── printer.js         # Funções utilitárias para geração e impressão de PDFs
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx
│   ├── components/
│   │   ├── MesaSidebar.tsx    # Componente para exibição de mesas
│   │   ├── Comanda.tsx        # Componente para exibição de comandas
│   └── styles/
│       └── tailwind.css       # Configurações de estilo usando Tailwind CSS
├── temp/                      # Diretório temporário para PDFs gerados
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## **🤝 Contribuição**

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga estas etapas:

1. **Faça um Fork do Repositório**
2. **Crie uma Branch para a sua Feature** (`git checkout -b feature-nome`)
3. **Commit suas mudanças** (`git commit -m 'Adiciona nova feature'`)
4. **Envie para a branch** (`git push origin feature-nome`)
5. **Abra um Pull Request**

---

## **📄 Licença**

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).

---

## **📞 Contato**

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- **Email:** rinaldoalvesvilela@hotmail.com
- **LinkedIn:** [Seu LinkedIn](https://www.linkedin.com/in/rinaldo-alves-28847a194/)

---

Este README foi projetado para ser atrativo, com uma estrutura clara e profissional que facilita a compreensão e utilização do projeto por outros desenvolvedores. A documentação técnica no início detalha o processo de implementação da nova funcionalidade de impressão, garantindo que qualquer pessoa possa replicar ou contribuir com o projeto facilmente.