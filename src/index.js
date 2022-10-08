const express = require('express');
const bodyParser = require('body-parser');
const { readTalkersData, writeTalkers, updatedTalkers, deleteTalkers } = require('./utils/fsTalkers');
const generateToken = require('./utils/generateToken');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const { validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate, 
  validateToken } = require('./middlewares/validateTalker');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

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

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
  async (req, res) => {
    const newTalker = req.body;
    const newTalkerWithId = await writeTalkers(newTalker);
    return res.status(201).json(newTalkerWithId);
  });

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const updatedTalkerData = req.body;
    const updatedTalker = await updatedTalkers(Number(id), updatedTalkerData);
    return res.status(200).json(updatedTalker);
  });

  app.delete('/talker/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await deleteTalkers(Number(id));
    return res.status(204).end();
  });

app.post('/login',
  validateEmail,
  validatePassword,
  (_req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
});
