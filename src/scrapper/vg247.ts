import * as cheerio from 'cheerio';

import request from '../utils/request';
import { CodeModel, ScrapperModel } from '../models/genshinCodeModel';
import logger from '../utils/logger';

export async function scrapperVg247(): Promise<ScrapperModel> {
  const scrapperModel = new ScrapperModel('https://www.vg247.com/genshin-impact-codes');
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
        const code = $(li).find('strong').first().text().trim();
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

    const normalCodes = getCodeFromSelector($('.article_body h2#codes').nextUntil('.article_body h2#livestream'), 'normal');
    const livestreamCode = getCodeFromSelector($('.article_body h2#livestream').nextUntil('.article_body h2#redeem'), 'livestream');
    scrapperModel.success = true;
    scrapperModel.codes = [...normalCodes, ...livestreamCode];
  } catch (error: any) {
    logger.error(error);
  }

  return scrapperModel;
}
