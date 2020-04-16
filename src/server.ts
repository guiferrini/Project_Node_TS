import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello World' }));

app.listen(3333, () => {
  console.log(' ✔  Server stared on port 3️⃣ 3️⃣ 3️⃣ 3️⃣');
});
