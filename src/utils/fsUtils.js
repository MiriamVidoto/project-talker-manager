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

module.exports = {
  readTalkersData,
};