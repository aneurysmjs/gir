import express, { type Express } from 'express';

const app = express();

app.get('/', (req, res) => res.send('It works papi!'));

if (import.meta.env.PROD) {
  app.listen(3000);
}

export const viteNodeApp: Express = app;
