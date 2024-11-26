const axios = require('axios');
const cheerio = require('cheerio');
const { errorResponse, successResponse } = require('../utils/baseResponse');

module.exports = {
    url: 'https://game8.co/games/Genshin-Impact/archives/304759',
    async execute() {
        try {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);

            const getCodeFromSelector = (el, type) => {
                const filteredOl = $(el).filter((i, el2) => $(el2).is('ol.a-orderedList'));
                const filteredLi = $(filteredOl).children('li.a-listItem').filter((i, li) => 
                    $(li).find('a.a-link').filter((i, link) => {
                        return $(link).attr('href')?.startsWith('https://genshin.hoyoverse.com/en/gift?code=');
                    }).length > 0
                );
    
                const codeList = [];
                
                filteredLi.each((i, el) => {
                    const code = $(el).find('a.a-link').text().trim();
                    const rewards = $(el).text().replace(code, '').replace('(EXPIRED)', '').trim().replace(/^-/, '').trim();
                    const expired = $(el).text().toLowerCase().includes('expired');

                    codeList.push({
                        type,
                        code,
                        rewards,
                        expired,
                    });
                });
    
                return codeList;
            };
    
            const normalCodes = getCodeFromSelector($("h2#hl_1").nextUntil('h2#hl_2'), 'normal');
            const livestreamCode2 = getCodeFromSelector($("h2#hl_2").nextUntil('h2#hl_3'), 'livestream');
            return successResponse(this.url, [...normalCodes, ...livestreamCode2]);
        } catch (error) {
            return errorResponse(this.url, error);
        }
    }
};