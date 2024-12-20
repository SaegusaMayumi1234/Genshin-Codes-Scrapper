import { CronJob } from 'cron';
import fs from 'fs';

import { CombinedCodeModel, ICombinedCodeProc } from '../models/genshinCodeModel';
import { scrapperGame8 } from '../scrapper/game8';
import { scrapperGamerant } from '../scrapper/gamerant';
import { scrapperGenshinImpactFandom } from '../scrapper/genshinImpactFandom';
import { scrapperPcgamesn } from '../scrapper/pcgamesn';
import { scrapperRockpapershotgun } from '../scrapper/rockpapershotgun';
import { scrapperVg247 } from '../scrapper/vg247';
import logger from '../utils/logger';

async function start() {
  try {
    logger.info('Starting to Scrapping Genshin Codes');
    const now = Date.now();
    const result = await Promise.all([
      scrapperGenshinImpactFandom(),
      scrapperGame8(),
      scrapperRockpapershotgun(),
      scrapperVg247(),
      scrapperPcgamesn(),
      scrapperGamerant(),
    ]);

    // for easy and fast code indexing
    const combinedCodeProcList: ICombinedCodeProc = {};

    for (const site of result) {
      for (const code of site.codes) {
        if (combinedCodeProcList[code.code] === undefined) {
          const newCombinedCode = new CombinedCodeModel();
          newCombinedCode.type = code.type;
          newCombinedCode.code = code.code;
          newCombinedCode.rewards = code.rewards;
          newCombinedCode.expired = code.expired;
          newCombinedCode.urlSources = [site.url];
          combinedCodeProcList[code.code] = newCombinedCode;
        } else {
          if (code.expired) {
            combinedCodeProcList[code.code].expired = code.expired;
          }
          if (!combinedCodeProcList[code.code].urlSources.includes(site.url)) {
            combinedCodeProcList[code.code].urlSources.push(site.url);
          }
        }
      }
    }

    const combinedCode: CombinedCodeModel[] = [];

    for (const code in combinedCodeProcList) {
      combinedCode.push(combinedCodeProcList[code]);
    }

    const valid = combinedCode.filter((value) => !value.expired);
    const expired = combinedCode.filter((value) => value.expired);

    fs.writeFileSync('./src/storages/local/result.json', JSON.stringify(result, null, 2), 'utf8');
    fs.writeFileSync('./src/storages/local/combinedResult.json', JSON.stringify(combinedCodeProcList, null, 2), 'utf8');
    fs.writeFileSync('./src/storages/local/all.json', JSON.stringify(combinedCode, null, 2), 'utf8');
    fs.writeFileSync('./src/storages/local/valid.json', JSON.stringify(valid, null, 2), 'utf8');
    fs.writeFileSync('./src/storages/local/expired.json', JSON.stringify(expired, null, 2), 'utf8');

    const elapsed = new Date().getTime() - now;
    logger.info(`Finished Scrapping Genshin Codes in ${elapsed} ms`);
  } catch (error) {
    logger.error(error);
  }
}

const job = new CronJob('*/5 * * * *', start);

(async () => {
  await start();
  job.start();
})();
