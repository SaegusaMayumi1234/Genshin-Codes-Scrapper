export class CodeModel {
  type: 'normal' | 'livestream' = 'normal';
  code: string = '';
  rewards: string = '';
  expired: boolean = false;
}

export class ScrapperModel {
  success: boolean = false;
  url: string;
  codes: CodeModel[] = [];

  constructor(url: string) {
    this.url = url;
  }
}

export class CombinedCodeModel {
  type: 'normal' | 'livestream' = 'normal';
  code: string = '';
  rewards: string = '';
  expired: boolean = false;
  urlSources: string[] = [];
}

export interface ICombinedCodeProc {
  [key: string]: CombinedCodeModel;
}
