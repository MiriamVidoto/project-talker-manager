const fs = require('fs').promises;
const path = require('path');

const TALKER_PATH = path.resolve(__dirname, '../talker.json');

async function readTalkersData() {
  try {
    const data = await fs.readFile(TALKER_PATH, 'utf-8');
    const talkers = JSON.parse(data);
    console.log('erro');
    return talkers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

async function writeTalkers(newTalker) {
  try {
    const talkers = await readTalkersData();
    const id = talkers.length + 1;
    const newTalkerWithId = { id, ...newTalker };
    const newTalkers = JSON.stringify([...talkers, newTalkerWithId]);
    await fs.writeFile(TALKER_PATH, newTalkers);
    return newTalkerWithId;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function updatedTalkers(idTalker, updateTalkerData) {
  const talkers = await readTalkersData();
  const updatedTalker = { id: idTalker, ...updateTalkerData };
  const newTalkers = talkers.reduce((listTalkers, currentTalker) => {
    if (currentTalker.id === idTalker) {
      return [...listTalkers, updatedTalker];
    }
    return [...listTalkers, updatedTalker];
  }, []);
  const newTalkersData = JSON.stringify(newTalkers);
  try {
      await fs.writeFile(TALKER_PATH, newTalkersData);
      return updatedTalker;
    } catch (error) {
      console.error(`Erro na edição do arquivo: ${error}`);
    }
}

async function deleteTalkers(id) {
  const talkers = await readTalkersData();
  const newTalkers = talkers.filter((currentPerson) => currentPerson.id !== id);
  const updatedData = JSON.stringify(newTalkers);
  try {
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), updatedData);
  } catch (error) {
    console.error(`Erro na exclusão do arquivo: ${error}`);
  }
}

module.exports = {
  readTalkersData,
  writeTalkers,
  updatedTalkers,
  deleteTalkers,
};