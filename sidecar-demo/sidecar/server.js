const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/monitor', (req, res) => {
  console.log('Sidecar received request:', req.body);
  res.status(200).send('Request logged by Sidecar!');
});

app.listen(PORT, () => {
  console.log(`Sidecar listening on port ${PORT}`);
});