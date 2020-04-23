import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database'; // n tem q importar 'nd', pq ela n exporta 'nd'

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log(' ✔  Server stared on port 3️⃣ 3️⃣ 3️⃣ 3️⃣');
});
