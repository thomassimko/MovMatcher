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
    ext: recommendation.extension,
  };

  return stringInject(format, replacementValues);
}

export default formatOutput;
