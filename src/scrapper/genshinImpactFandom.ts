import * as cheerio from 'cheerio';

import request from '../utils/request';
import { CodeModel, ScrapperModel } from '../models/genshinCodeModel';
import logger from '../utils/logger';

export async function scrapperGenshinImpactFandom(): Promise<ScrapperModel> {
  const scrapperModel = new ScrapperModel('https://genshin-impact.fandom.com/wiki/Promotional_Code');
  try {
    const data = await request.getSiteData(scrapperModel.url);
    const $ = cheerio.load(data);

    const rowTable = $('.wikitable tbody')
      .find('tr')
      .filter((i, el) => !$(el).children().first().is('th'));

    const dateRegex = /((?:\d{4}-\d{2}-\d{2})|indefinite|unknown|expired)/gim;
    const now = new Date();
    const codeList: CodeModel[] = [];

    $(rowTable).each((i, tr) => {
      const codes = $(tr).find('td:nth-of-type(1) a b code');
      const rewards = $(tr).find('td:nth-of-type(3) span.item span.item-text').text().trim();

      let expired = false;
      const status = [...($(tr).find('td:nth-of-type(4)').attr('data-sort-val')?.matchAll(dateRegex) || [])].map((date) => date[0].toLowerCase());

      if (status.includes('expired')) {
        expired = true;
      } else if (status[1] === 'indefinite' || status[1] === 'unknown') {
        expired = false;
      } else {
        const dateParsed = status.map((date) => new Date(date)).sort((a: any, b: any) => b - a);
        if (+dateParsed[0] > +now && +now > +dateParsed[1]) {
          expired = false;
        } else {
          expired = true;
        }
      }

      $(codes).each((i, code) => {
        codeList.push({
          type: 'normal',
          code: $(code).text(),
          rewards,
          expired,
        });
      });
    });

    scrapperModel.success = true;
    scrapperModel.codes = codeList;
  } catch (error: any) {
    logger.error(error);
  }

  return scrapperModel;
}
