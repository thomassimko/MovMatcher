declare interface MovieRecommendation {
  inputFile: {
    fileName: string;
    fullPath: string;
    relativePath: string;
    size: number;
    extension: string;
  };
  outputFile: string;
  recommendedMovie: Movie;
}
