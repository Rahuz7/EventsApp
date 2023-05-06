const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Event service Running !' });
});

app.listen(6000, () => {
  console.log('Serveur en écoute sur le port 6000');
});
