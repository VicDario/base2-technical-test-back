## Description

This project is a test for Base2.

## Installation

```bash
$ pnpm install
```

## Before run the app
1. Install dependencies.
2. Create an `.env` file following the `.env.example` file
3. Run `docker compose up` to create the necessary services (MongoDb), its mandatory to have the mongo envs filled
4. Run the app.
5. If you wish you can seed the databases with data with the `seed` endpoint.

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test


# test coverage
$ pnpm run test:cov
```
