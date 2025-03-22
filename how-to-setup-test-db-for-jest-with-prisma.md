## What problem?

We want to have a separate database for running integration tests in our node app (or next.js)

We are using prisma to manage ORM for database.


## Add jest.setup.ts with overwrite database URL

```ts
// Nadpisanie zmiennej środowiskowej DATABASE_URL dla testów
process.env.DATABASE_URL = "postgresql://X:X@localhost:PORT/mydb?schema=public";
```

## Modify jest.config.ts to connect with setup

```ts
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  // Add more setup options before each test is run
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // HERE WE ADD SETUP FILE
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

## Extra! Add script to reset your test database

add something like `init_test_db.js`

with the code:

```js
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

process.env.DATABASE_URL =
  "postgresql://X:X@localhost:PORT/mydb?schema=public";

const prisma = new PrismaClient();

async function main() {
  console.log('Inicjalizacja bazy testowej...');
  
  try {
    // Najpierw wykonujemy migracje, aby utworzyć strukturę bazy danych
    console.log('Uruchamianie migracji Prisma dla bazy testowej...');
    try {
      const { stdout, stderr } = await execPromise('npx prisma migrate reset --force --skip-seed');
      console.log('Wynik migracji:', stdout);
      if (stderr) console.error('Błędy migracji:', stderr);
    } catch (error) {
      console.error('Błąd podczas wykonywania migracji:', error);
      throw error;
    }
    
    console.log('Baza testowa została pomyślnie zainicjalizowana!');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy testowej:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then we connect that inside package.json

```json
"scripts": {
  ...
  "test:init-db": "node app/_script/init_test_db.js",
  ...
}
```

