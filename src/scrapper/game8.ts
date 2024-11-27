import * as cheerio from 'cheerio';

import request from '../utils/request';
import { CodeModel, ScrapperModel } from '../models/genshinCodeModel';
import logger from '../utils/logger';

export async function scrapperGame8(): Promise<ScrapperModel> {
  const scrapperModel = new ScrapperModel('https://game8.co/games/Genshin-Impact/archives/304759');
  try {
    const data = await request.getSiteData(scrapperModel.url);
    const $ = cheerio.load(data);

    const getCodeFromSelector = (el: any, type: any) => {
      const filteredOl = $(el).filter((i, el2) => $(el2).is('ol.a-orderedList'));
      const filteredLi = $(filteredOl)
        .children('li.a-listItem')
        .filter(
          (i, li) =>
            $(li)
              .find('a.a-link')
              .filter((i, link) => {
                return ($(link).attr('href') ?? '').startsWith('https://genshin.hoyoverse.com/en/gift?code=');
              }).length > 0,
        );

      const codeList: CodeModel[] = [];

      filteredLi.each((i, li) => {
        const code = $(li).find('a.a-link').text().trim();
        const rewards = $(li).text().replace(code, '').replace('(EXPIRED)', '').trim().replace(/^-/, '').trim();
        const expired = $(li).text().toLowerCase().includes('expired');

        codeList.push({
          type,
          code,
          rewards,
          expired,
        });
      });

      return codeList;
    };

    const normalCodes = getCodeFromSelector($('h2#hl_1').nextUntil('h2#hl_2'), 'normal');
    const livestreamCode = getCodeFromSelector($('h2#hl_2').nextUntil('h2#hl_3'), 'livestream');
    scrapperModel.success = true;
    scrapperModel.codes = [...normalCodes, ...livestreamCode];
  } catch (error: any) {
    logger.error(error);
  }

  return scrapperModel;
}
