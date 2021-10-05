## Description

Este repositório é um microservice de notificações via email e whatsapp que trabalha com message broker [Kafka](https://kafka.apache.org/) e se comunica com um app, Você pode encontrar o repositório. [App](https://github.com/elvesbd/app-nestjs), Para envio de e-mail usei a [sendinblue](https://pt.sendinblue.com/), e para mensagens via whatsapp [zenvia](https://www.zenvia.com/).

## Installation

```bash
$ npm install

$  docker run --name mongo -p 27017:27017 -d mongo
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📝 License

Feito com 💜 by Elves Brito.  
[![Linkedin Badge](https://img.shields.io/badge/-Elves-blue?style=flat-square&logo=Linkedin&logoColor=White&link=https://www.linkedin.com/in/elvesbd/)](https://www.linkedin.com/in/elvesbd/)
