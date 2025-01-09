import * as cheerio from 'cheerio';

import request from '../utils/request';
import { CodeModel, ScrapperModel } from '../models/genshinCodeModel';
import logger from '../utils/logger';

export async function scrapperPcgamesn(): Promise<ScrapperModel> {
  const scrapperModel = new ScrapperModel('https://www.pcgamesn.com/genshin-impact/codes-redeem-promo');
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
        const rewards = $(li).text().replace(code, '').replace('(NEW)', '').trim().replace(/^[-–]/, '').trim();
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

    const normalCodes = getCodeFromSelector($('.entry-content h2:nth-of-type(1)').nextUntil('.entry-content h2:nth-of-type(2)'), 'normal');
    const livestreamCode = getCodeFromSelector($('.entry-content h2:nth-of-type(2)').nextUntil('.entry-content h3:nth-of-type(1)'), 'livestream');

    scrapperModel.success = true;
    scrapperModel.codes = [...normalCodes, ...livestreamCode];
  } catch (error: any) {
    logger.error(error);
  }

  return scrapperModel;
}
