export type Scrappers = {
  [key: string]: () => Promise<any>;
};
