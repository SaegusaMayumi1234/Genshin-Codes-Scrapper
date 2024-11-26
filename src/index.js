const game8 = require('./scrapper/game8');
const genshinImpactFandom = require('./scrapper/genshinImpactFandom');
const rockpapershotgun = require('./scrapper/rockpapershotgun');
const vg247 = require('./scrapper/vg247');

game8.execute().then(data => console.log(data));
genshinImpactFandom.execute().then(data => console.log(data));
rockpapershotgun.execute().then(data => console.log(data));
vg247.execute().then(data => console.log(data));
