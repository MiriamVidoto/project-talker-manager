const { regexDate } = require('../utils/regex');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res
      .status(400)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validatewatchedAt = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;

  if (!watchedAt) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regexDate.test(watchedAt)) {
    return res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const isRateInterger = (number) => number < 1 || number > 5 || !Number.isInteger(number);

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate !== 0) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
  } if (isRateInterger(rate)) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  } 
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
};
