## Przygotowanie do pracy z Prisma

### Instalacja

```
bun install --dev prisma
```

### Inicjacja prismy

```
bunx prisma init
```

### Przygotowanie VS Code

Instalacja rozszerzenia vs code "Prisma"

### Przykładowa schema (schema.prisma)

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id              String    @id @default(auto()) @map("_id") @db.ObjectId
  name            String?
  username        String?   @unique
  bio             String?
  email           String?   @unique
  emailVerified   DateTime?
  image           String?
  coverImage      String?
  profileImage    String?
  hashedPassword  String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  followingIds    String[]  @db.ObjectId
  hasNotification Boolean?

  posts         Post[]
  comments      Comment[]
  notifications Notification[]
}

model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String   @db.ObjectId
  likedIds  String[] @db.ObjectId

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  commnets Comment[]
}

model Comment {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String   @db.ObjectId
  postId    String   @db.ObjectId

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
}

model Notification {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  body      String
  userId    String   @db.ObjectId
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Utworzenie schemy

```
bunx prisma db push
```

### Instalacja klienta prismy

```
bun install @prisma/client
```

### Obejście problemu hot reloding w Next.js (tworzenie wielu instancji prismy)

Tworzymy plik prismadb.ts który jest proxy do PrismaClient

```
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// workaround for hot reload in next.js, avoid creating new PrismaClient on each reload

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
```

