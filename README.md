# Projeto Store Manager 📦

Consiste em uma API construída para o gerenciamento de um e-commerce de produtos com a possibilidade de criar, visualizar, deletar e atualizar produtos e vendas.

* Construída com Node.js, Express, MySQL e Docker
* Utilizando as práticas do REST
* Testes realizados com Mocha, Chai e Sinnon
* Aplicada Arquitetura de Software, com as camadas de Modelo, de Serviço e de Controladores


### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker:

> Observação: crie e popule o banco de dados, o `schema` está presente nos arquivos `migration.sql` e `seed.sql`, respectivamente.

```
docker-compose up -d
docker attach store_manager
npm install // para instalar as dependências
docker-compose down // para parar completamente a aplicação
```

E utilize os comandos a seguir para executar a aplicação:

```
npm start // para iniciar a aplicação
ou
npm run test:mocha // para executar os testes
```

### Endpoints

#### Produtos

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma lista com todos os produtos | http://localhost:3000/products |
| `GET` | Retorna um produto específico | http://localhost:3000/products/:id |
| `GET` | Filtra pelo nome dos produtos em relação os caracteres passada como query | http://localhost:3000/products/search?q=name |
| `PUT` | Altera o nome de um produto específico | http://localhost:3000/products/:id |
| `POST` | Cria um novo produto | http://localhost:3000/products |
| `DELETE` | Deleta um produto específico | http://localhost:3000/products/:id |


Na requisição do PUT e POST, é necessário informar o seguinte JSON:

```
{ 
  "name": "Produto ABC"
}
```

#### Vendas

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma lista com todos as vendas | http://localhost:3000/sales |
| `GET` | Retorna uma venda específica | http://localhost:3000/sales/:id |
| `PUT` | Altera os dados de uma venda específica | http://localhost:3000/sales/:id |
| `POST` | Valida e cadastra uma nova venda | http://localhost:3000/sales |
| `DELETE` | Deleta uma venda específica | http://localhost:3000/sales/:id |


Na requisição do PUT e POST, é necessário informar a quantidade e o id do produto no formato a seguir:

```
[
  {
    "productId": 1,
    "quantity": 2
  }, 
  { 
    "productId": 8,
    "quantity": 28
  }
]
```
