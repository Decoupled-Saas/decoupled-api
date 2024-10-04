# 🚀 Decoupled Saas API TypeScript Boilerplate

```code
Hey There! 🙌
🤾 that ⭐️ button if you like this boilerplate.
```

## 🌟 Introduction

Welcome to the Decoupled Saas API TypeScript Boilerplate – a streamlined, efficient, and scalable foundation for building powerful backend services with modern tools and practices in Express.js and TypeScript.

## 💡 Motivation

This boilerplate aims to:

- ✨ Reduce setup time for new projects
- 📊 Ensure code consistency and quality
- ⚡ Facilitate rapid development
- 🛡️ Encourage best practices in security, testing, and performance

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging with `winston and morgan`
- 🧪 Comprehensive Testing: ~~Setup with Vitest and Supertest~~ Coming Soon
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

## 🛠️ Getting Started

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/Decoupled-Saas/decoupled-api`
- Navigate: `cd decoupled-api`
- Install dependencies: `yarn`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Ensure you have docker installed we built the boilerplate with postgresql in mind, and also included redis for caching
- `yarn docker:up` starts the following containers:

  - postgres database - binding to localhost port 5432
  - pgweb - a webinterface to interact with the database - accessible on [http:/localhost:8081](http:/localhost:8081)
  - mailpit - a smtp listener for development - smtp on port 1025, web interface on port 8025
  - redis - a single redis node on port 6379 and port 16379

- `yarn migrate` - this runs the migrations to prepare the database
- `yarn seed` - this prepares mostly predefined roles and permissions tables in the database
- `yarn keygen` - this creates an access key and refresh key which is used to sign all authorisations
- Development Mode: `yarn dev` - by default the api uses port 8080 [http:/localhost:8080](http://localhost:8080) => should redirect you to the swagger documents
- Building: `yarn build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `yarn build && yarn start`
