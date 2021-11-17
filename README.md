# Desafio Compasso NodeJS

API desenvolvida para a etapa de desafio técnico no processo seletivo para vaga de desenvolvedor back-end NodeJS na Compass


## Tecnologias
- [Express](https://expressjs.com/)           | WEB framework para Node.js
- [Sequelize](https://sequelize.org/master/)  | ORM para Node.js
- [SQLite](https://www.sqlite.org/index.html) | Base de dados relacional que dispensa o uso de um servidor na sua atuação.
- [Docker](https://www.docker.com/)           | Virtualização de ambientes
- [Jest](https://jestjs.io/pt-BR/)            | Framework de testes


## Pré-requisitos
#### Rodar com NPM
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

#### Rodar com Docker
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


## Instalação e execução
1. Faça o clone do projeto
    ```
    git clone https://github.com/vitorsilva98/desafio-compasso-nodejs.git
    ```
2. Instale as dependências
    ```
    npm install
    ```
3. Rode o script de start
    ```
    npm start
    ```
4. Caso preferir, rode pelo docker
    ```
    docker-compose up
    ```
5. Para rodar os testes
    ```
    npm test
    ```


## Rotas
### City
- **[POST] /cities** 

Exemplo body
```
{
    "name": "São Paulo",
    "state": "SP"
}
```

Os estados devem ser enviados no formato de sigla: 
```
"AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
```

- **[GET] /cities/findByName/:name**

- **[GET] /cities/findByState/:state**

---
### Customer
- **[POST] /customers**

Exemplo body
```
{
    "fullName": "Vitor Silva",
    "gender": "M",
    "birthDate": "1998-11-08",
    "age": 23,
    "cityId": 1
}
```

Sexo deve ser enviado no formato abreviado: 
```
"M", "F", "NB", "O"
```

Data de aniversário deve estar no formato americano:
```
YYYY-MM-DD
```

- **[GET] /customers/:id**

- **[GET] /customers/findByName/:name**

- **[PATCH] /customers/:id**

Exemplo body
```
{
    "fullName": "Vitor Silva Sauro"
}
```

- **[DELETE] /customers/:id**

#### Também é possível abrir o arquivo "compass-api.postman_collection.json" no Postman para realização de testes manuais