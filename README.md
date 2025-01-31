# Genshin-Codes-Scrapper

Genshin-Codes-Scrapper is a web scraper designed to fetch Genshin Impact redeem codes from multiple websites and sources. It saves the codes into a JSON file, which can be accessed directly or via a locally hosted API.

## Features

- Scrapes redeem codes from various websites and sources.
- Saves scraped codes into a JSON file for easy access.
- Provides a locally hosted API to retrieve the data.
- Scheduled scraping using cron jobs for automation.
- Easy to customize using config.

## Source List

Sources|Working List|Up To Date|Bot Protection|Implemented
---|---|:---:|---|:---:
|[genshin-impact.fandom.com](https://genshin-impact.fandom.com/wiki/Promotional_Code)|Separated nicely|✅|None|✅
|[game8.co](https://game8.co/games/Genshin-Impact/archives/304759)|Separated nicely|✅|None|✅
|[www.rockpapershotgun.com](https://www.rockpapershotgun.com/genshin-impact-codes-list)|Separated nicely|✅|None|✅
|[www.vg247.com](https://www.vg247.com/genshin-impact-codes)|Separated nicely|✅|None|✅
|[www.pcgamesn.com](https://www.pcgamesn.com/genshin-impact/codes-redeem-promo)|Separated nicely|✅|Cloudflare|✅
|[gamerant.com](https://gamerant.com/genshin-impact-redeem-code-livestream-codes-free-primogem-redemption)|Separated nicely|✅|Unknown|✅
|[www.pockettactics.com](https://www.pockettactics.com/genshin-impact/codes)|Separated nicely|✅|Cloudflare|❌
|[ucngame.com](https://ucngame.com/codes/genshin-impact-codes)|Not separated|✅|Cloudflare|❌
|[progameguides.com](https://progameguides.com/genshin-impact/genshin-impact-codes)|Separated but sometimes it mixed|Some might outdated|None|❌
|[www.gamesradar.com](https://www.gamesradar.com/genshin-impact-codes-redeem)|Separated but sometimes it mixed|✅|None|❌
|[www.pocketgamer.com](https://www.pocketgamer.com/genshin-impact/codes)|Separated but livestream code is not|✅|None|❌
|[gamewith.net](https://gamewith.net/genshin-impact/article/show/22737)|Really confusing|✅|None|❌
|[www.ggrecon.com](https://www.ggrecon.com/guides/genshin-impact-codes)|Not really good separation|Very outdated|None|❌

There is still many more source list but this is the most popular one. Feel free to add many more list by contributing to this project.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Genshin-Codes-Scrapper.git
   cd Genshin-Codes-Scrapper
   ```

2. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

3. Copy the example configuration file and adjust settings if needed:
   ```bash
   cp config.example.json config.json
   ```
   Example `config.json`:
   ```json
   {
     "env": "development",
     "port": 3000,
     "proxied": false,
     "enabledSites": {
       "genshinImpactFandom": true,
       "game8": true,
       "rockpapershotgun": true,
       "vg247": true,
       "pcgamesn": true,
       "gamerant": true
     },
     "schedulers": {
       "scrapeGenshinCodes": "*/5 * * * *"
     }
   }
   ```

   ### Configuration Explanation

   - **env**: The environment the application is running in. For example, `development` or `production`.
   - **port**: The port on which the API will be hosted. Default is `3000`.
   - **proxied**: Indicates whether the app is running behind a proxy. Set to number if a proxy is used based on how many proxy is set up.
   - **enabledSites**: A list of websites to scrape for Genshin Impact codes. Set `true` to enable scraping from a site or `false` to disable it.
   - **schedulers**: Defines the cron schedule for scraping tasks. The example `"*/5 * * * *"` runs the task every 5 minutes.

## Usage

1. Start the application:
   ```bash
   yarn dev
   ```

2. Access the scraped data:
   - **JSON File**: Locate the generated JSON file in the project directory.
   - **API**: Access the API hosted locally (default port configuration and route link can be found in the code).

## Technologies Used

- **[Cheerio](https://cheerio.js.org/)**: For parsing and extracting data from HTML.
- **[Axios](https://axios-http.com/)**: For making HTTP requests.
- **[Cron](https://www.npmjs.com/package/cron)**: For scheduling automated scraping tasks.
- **[Express](https://expressjs.com/)**: For hosting the API.

## Contributing

Feel free to contribute using Pull Requests. Any changes to make the project better are always appreciated.

## License

This project is licensed under the [MIT License](./LICENSE).

## Acknowledgments

- Special thanks to [ScrapeAction](https://github.com/themojache/ScrapeAction) for inspiration and many parts of the code.
