// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient();
//   }
//   prisma = (global as any).prisma;
// }

// export default prisma;

import { PrismaClient, Prisma } from '@prisma/client';

let prisma: PrismaClient;

const prismaOptions: Prisma.PrismaClientOptions = {
  log: ['query', 'info', 'warn', 'error'] as (
    | Prisma.LogLevel
    | Prisma.LogDefinition
  )[], // Correctly typing the log property
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Note: Prisma does not have a direct `pool` option. Connection pooling is typically handled by the database or a pooling library.
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions);
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient(prismaOptions);
  }
  prisma = (global as any).prisma;
}

export default prisma;
