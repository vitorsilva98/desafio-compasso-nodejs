# Desafio Compasso NodeJS

API desenvolvida para a etapa de desafio técnico no processo seletivo para vaga de desenvolvedor back-end NodeJS na Compass


## Tecnologias
---
- [Express](https://expressjs.com/)           | WEB framework para Node.js
- [Sequelize](https://sequelize.org/master/)  | ORM para Node.js
- [SQLite](https://www.sqlite.org/index.html) | Base de dados relacional que dispensa o uso de um servidor na sua atuação.
- [Docker](https://www.docker.com/)           | Virtualização de ambientes
- [Jest](https://jestjs.io/pt-BR/)            | Framework de testes


## Pré-requisitos
---
#### Rodar com NPM
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

#### Rodar com Docker
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


## Instalação e execução
---
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
---
4. Caso preferir, rode pelo docker
    ```
    docker-compose up
    ```
---
5. Para rodar os testes
    ```
    npm test
    ```
---


### Para ter acesso as rotas e payloads abra o arquivo "compass-api.postman_collection.json" no Postman