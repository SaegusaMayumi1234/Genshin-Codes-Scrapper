import fs from 'fs';

function init() {
  if (!fs.existsSync('./src/storages/local/result.json')) {
    fs.writeFileSync('./src/storages/local/result.json', JSON.stringify([], null, 2));
  }
  if (!fs.existsSync('./src/storages/local/combinedResult.json')) {
    fs.writeFileSync('./src/storages/local/combinedResult.json', JSON.stringify({}, null, 2));
  }
  if (!fs.existsSync('./src/storages/local/all.json')) {
    fs.writeFileSync('./src/storages/local/all.json', JSON.stringify([], null, 2));
  }
  if (!fs.existsSync('./src/storages/local/valid.json')) {
    fs.writeFileSync('./src/storages/local/valid.json', JSON.stringify([], null, 2));
  }
  if (!fs.existsSync('./src/storages/local/expired.json')) {
    fs.writeFileSync('./src/storages/local/expired.json', JSON.stringify([], null, 2));
  }
}

init();
