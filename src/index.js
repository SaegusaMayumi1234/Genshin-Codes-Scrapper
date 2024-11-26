const game8 = require('./scrapper/game8');
const genshinImpactFandom = require('./scrapper/genshinImpactFandom');

game8.execute().then(data => console.log(data));
fandom.execute().then(data => console.log(data));