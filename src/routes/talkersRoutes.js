const express = require('express');

const {
  readTalkersData,
  writeTalkers,
  updatedTalkers,
  deleteTalkers,
  readTalkersByName,
} = require('../utils/fsTalkers');
const {
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
  validateToken,
} = require('../middlewares/validateTalker');

const router = express.Router();

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const result = await readTalkersByName(q);
  if (result.length === 0 || result === undefined) {
    return res.status(200).json([]);
  }
  return res.status(200).json(result);
}); 

router.get('/', async (_req, res) => {
  const talkers = await readTalkersData();
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkersData();
  const talkerIndex = talkers.findIndex((i) => i.id === Number(id));
  if (talkerIndex < 0) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkers[talkerIndex]);
});

router.post(
  '/',
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
  },
);

router.put(
  '/:id',
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
  },
);

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalkers(Number(id));
  return res.status(204).end();
});

module.exports = router;