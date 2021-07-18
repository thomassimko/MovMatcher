export type IProgressItem = MovieRecommendation & {
  timeRemaining: number;
  speed: number;
  percentage: number;
};

export type IProgressMap = {
  [title: string]: IProgressItem;
};
