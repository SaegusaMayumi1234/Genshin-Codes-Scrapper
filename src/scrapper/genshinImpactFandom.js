const axios = require('axios');
const cheerio = require('cheerio');
const { errorResponse, successResponse } = require('../utils/baseResponse');

module.exports = {
    url: 'https://genshin-impact.fandom.com/wiki/Promotional_Code',
    async execute() {
        try {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);

            const rowTable = $('.wikitable tbody').find('tr').filter((i, el) => !$(el).children().first().is('th'));

            const dateRegex = /((?:\d{4}\-\d{2}\-\d{2})|indefinite|expired)/igm;
            const now = new Date();
            const codeList = [];

            $(rowTable).each((i, tr) => {
                const codes = $(tr).find('td:nth-of-type(1) a b code');
                const rewards = $(tr).find('td:nth-of-type(3) span.item span.item-text').text().trim();
                
                let expired = false;
                const status = [...$(tr).find('td:nth-of-type(4)').attr('data-sort-val')?.matchAll(dateRegex)].map(date => date[0].toLowerCase());

                if (status.includes('expired')) {
                    expired = true;
                } else if (status.includes('indefinite')) {
                    expired = false;
                } else {
                    const dateParsed = status.map(date => new Date(date)).sort((a, b) => b - a);
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

            return successResponse(this.url, codeList);
        } catch (error) {
            return errorResponse(this.url, error);
        }
    }
}