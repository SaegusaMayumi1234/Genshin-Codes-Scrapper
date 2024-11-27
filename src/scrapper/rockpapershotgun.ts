import * as cheerio from 'cheerio';

import request from '../utils/request';
import { CodeModel, ScrapperModel } from '../models/genshinCodeModel';
import logger from '../utils/logger';

export async function scrapperRockpapershotgun(): Promise<ScrapperModel> {
  const scrapperModel = new ScrapperModel('https://www.rockpapershotgun.com/genshin-impact-codes-list');
  try {
    const data = await request.getSiteData(scrapperModel.url);
    const $ = cheerio.load(data);

    const getCodeFromSelector = (el: any, type: any) => {
      const filteredUl = $(el).filter((i, el2) => $(el2).is('ul'));
      const filteredLi = $(filteredUl)
        .children('li')
        .filter((i, li) => $(li).find('strong').length > 0);

      const codeList: CodeModel[] = [];

      filteredLi.each((i, li) => {
        const code = $(li).find('strong').text().trim();
        const rewards = $(li).text().replace(code, '').trim().replace(/^:/, '').trim();
        const expired = false;

        codeList.push({
          type,
          code,
          rewards,
          expired,
        });
      });

      return codeList;
    };

    const normalCodes = getCodeFromSelector($('.article_body h2#section-1').nextUntil('.article_body h2#section-6'), 'normal');
    const livestreamCode = getCodeFromSelector($('.article_body h2#section-6').nextUntil('.article_body h2#section-2'), 'livestream');
    scrapperModel.success = true;
    scrapperModel.codes = [...normalCodes, ...livestreamCode];
  } catch (error: any) {
    logger.error(error);
  }

  return scrapperModel;
}
