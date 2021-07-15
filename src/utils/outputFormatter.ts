// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import stringInject from 'stringinject';

export function formatOutput(
  recommendation: MovieRecommendation,
  format: string
): string {
  const replacementValues = {
    year: recommendation.recommendedMovie.release_year,
    title: recommendation.recommendedMovie.title,
    ext: recommendation.inputFile.extension,
  };

  return stringInject(format, replacementValues).trim();
}

export default formatOutput;
