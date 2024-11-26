const axios = require('axios');
const cheerio = require('cheerio');
const { errorResponse, successResponse } = require('../utils/baseResponse');

module.exports = {
    url: 'https://www.rockpapershotgun.com/genshin-impact-codes-list',
    async execute() {
        try {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);

            const getCodeFromSelector = (el, type) => {
                const filteredUl = $(el).filter((i, el2) => $(el2).is('ul'));
                const filteredLi = $(filteredUl).children('li').filter((i, li) => 
                    $(li).find('strong').length > 0
                );
    
                const codeList = [];
                
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
    
            const normalCodes = getCodeFromSelector($(".article_body h2#section-1").nextUntil('.article_body h2#section-6'), 'normal');
            const livestreamCode2 = getCodeFromSelector($(".article_body h2#section-6").nextUntil('.article_body h2#section-2'), 'livestream');
            return successResponse(this.url, [...normalCodes, ...livestreamCode2]);
        } catch (error) {
            return errorResponse(this.url, error);
        }
    }
};