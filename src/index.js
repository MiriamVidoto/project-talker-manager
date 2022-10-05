const express = require('express');
const bodyParser = require('body-parser');
const { readTalkersData } = require('./utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkersData();
    if (talkers.length === 0) {
      return res.status(200).json([]);
    }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkersData();
  const talkerIndex = talkers.findIndex((i) => i.id === Number(id));
  if (talkerIndex < 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkers[talkerIndex]);
});
