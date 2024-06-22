


https://github.com/harish-khandre/PODITIVITY-Assignment/assets/116620870/2cc43dca-1bea-46e3-9032-3723441a87cc


Install dependencies

```bash
npm i
or
bun i
```

Add the following environment variables to your .env file

```
DATABASE_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=
```

Setup Prisma

```bash
  npx prisma generate
  npx prisma migrate dev
```

Start the app

```bash
  npm run dev
```
