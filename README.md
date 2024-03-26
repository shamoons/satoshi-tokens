# Satoshi Tokens

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create an `.env` file in the root directory and add the following environment variables:
POSTGRES_PRISMA_URL="postgresql://YOUR_POSTGRES_URL"
POSTGRES_URL_NON_POOLING="postgresql://YOUR_POSTGRES_URL"

Replace `YOUR_POSTGRES_URL` with the connection URL for your PostgreSQL database.

Next, run the Prisma migration to create the required database tables:

```bash
npx prisma migrate dev
```

Then, generate the Prisma client:

```bash
npx prisma generate
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
