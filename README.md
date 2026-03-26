<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

# NestJS E-Commerce Backend

A scalable and production-ready backend application built with NestJS, designed to simulate a real-world e-commerce system. The project focuses on clean architecture, security, performance optimization, and maintainability using modern backend technologies.

---

## Overview

This application provides a complete backend solution for managing users, products, orders, and payments. It is structured following modular design principles and incorporates best practices such as authentication, role-based access control, database transactions, caching, background processing, and automated testing.

The system is designed to be extensible and suitable for real production environments.

---

## Core Features

### Authentication and Authorization

* Secure user registration and login using JWT
* Password hashing with bcrypt
* Role-based access control (Admin and Customer)
* Route protection using Guards

### Product and Inventory Management

* Product creation restricted to administrators
* Inventory tracking and updates
* Validation to prevent invalid data such as negative stock
* Efficient querying using database indexing

### Order Management

* Creation of orders with multiple items
* Validation of product availability before order confirmation
* Use of database transactions to ensure data consistency
* Automatic rollback in case of failure

### Payment System

* Payment processing simulation
* Idempotency key implementation to prevent duplicate transactions
* Automatic order status update after successful payment

### Caching and Performance

* Redis integration for caching frequently accessed data
* Reduced database load through cache layer
* Cache invalidation strategy after data updates

### Background Processing

* Queue system using BullMQ
* Asynchronous job handling (e.g., email notifications)
* Separation of heavy tasks from request lifecycle

### Logging

* Structured logging using Winston
* Multiple log levels (info, error, etc.)
* Persistent log storage for debugging and monitoring

### API Documentation

* Interactive API documentation using Swagger
* Support for authenticated endpoints with JWT

### Testing

* Unit testing for services using Jest
* Integration testing using Supertest
* Ensures reliability and correctness of application behavior

---

## Technology Stack

* NestJS (Node.js framework)
* TypeScript
* PostgreSQL with TypeORM
* Redis (ioredis)
* BullMQ (queue system)
* JWT for authentication
* bcrypt for password hashing
* Swagger for API documentation
* Winston for logging
* Jest and Supertest for testing
* Docker and Docker Compose

---

## Getting Started

### Installation

```bash
npm install
```

### Run the application

```bash
npm run start:dev
```

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mydb
JWT_SECRET=secret
REDIS_URL=redis://localhost:6379
```

---

## API Documentation

Once the application is running, the API documentation is available at:

```
http://localhost:3000/api-docs
```

---

## Running with Docker

```bash
docker-compose up --build
```

This will start:

* Backend server
* PostgreSQL database
* Redis instance

---

## Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:e2e
```

---

## Project Structure

The project follows a modular architecture:

* `modules/` contains domain-specific modules (auth, users, products, orders, payments)
* `config/` contains configuration files (database, redis, logger, swagger)
* `common/` contains shared utilities such as guards and decorators
* `database/` contains data source configuration

---

## Notes

This project is designed as a reference implementation of a modern backend system. It can be extended to include real payment gateways, external email services, or deployed to cloud infrastructure.

---
