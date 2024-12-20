import * as cheerio from 'cheerio';

import request from '../utils/request';
import { CodeModel, ScrapperModel } from '../models/genshinCodeModel';
import logger from '../utils/logger';

export async function scrapperGamerant(): Promise<ScrapperModel> {
  const scrapperModel = new ScrapperModel('https://gamerant.com/genshin-impact-redeem-code-livestream-codes-free-primogem-redemption/');
  try {
    const data = await request.getSiteData(scrapperModel.url);
    const $ = cheerio.load(data);

    const getCodeFromSelector = (el: any, type: any) => {
      const filteredUl = $(el).filter((i, el2) => $(el2).is('ul'));
      const filteredLi = $(filteredUl)
        .children('li')
        .filter(
          (i, li) =>
            $(li)
              .find('a')
              .filter((i, link) => {
                return /^https?:\/\/genshin\.hoyoverse\.com\/en\/gift\?code=/.test($(link).attr('href') ?? '');
              }).length > 0,
        );

      const codeList: CodeModel[] = [];

      filteredLi.each((i, li) => {
        const code = $(li).find('a').first().text().trim();
        const rewards = $(li).text().replace(code, '').trim().replace(/^-/, '').trim();
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

    const ulCodeList = $('.content-block-regular h2:nth-of-type(1)')
      .nextUntil('.content-block-regular h3#expired-codes')
      .filter((i, el) => $(el).is('ul'));

    const normalCodes = ulCodeList.length > 1 ? getCodeFromSelector(ulCodeList.slice(1), 'normal') : getCodeFromSelector(ulCodeList, 'normal');
    const livestreamCode = ulCodeList.length > 1 ? getCodeFromSelector(ulCodeList.first(), 'livestream') : [];

    scrapperModel.success = true;
    scrapperModel.codes = [...normalCodes, ...livestreamCode];
  } catch (error: any) {
    logger.error(error);
  }

  return scrapperModel;
}
