export interface WordGroups {
  subjects: string[];
  actions: string[];
  objects: string[];
  endings: string[];
}

export enum AnswerSource {
  AI = 'AI',
  LOCAL = 'LOCAL'
}

export interface AnswerResult {
  text: string;
  source: AnswerSource;
}