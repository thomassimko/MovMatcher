import React, { FC, useState } from 'react';
import { SearchBar } from './SearchBar';
import { MovieListItem } from './MovieListItem';
import { searchMovieFuzzy } from '../../utils/elasticDB';

export interface IMovieSearchProps {
  detailed?: boolean;
  showHover?: boolean;
}

export const MovieSearch: FC<IMovieSearchProps> = (
  props: IMovieSearchProps
) => {
  const [movieMatches, setMovieMatches] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const doSearch = async (text?: string) => {
    if (!text) {
      return;
    }
    setLoading(true);
    const results = await searchMovieFuzzy(text);
    setMovieMatches(results);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <SearchBar doSearch={(text?: string) => doSearch(text)} />
      <div className="flex-grow pt-3 overflow-y-scroll divide-y">
        {movieMatches.map(
          (movie) =>
            movie && (
              <MovieListItem
                key={movie.tmdb_id}
                movie={movie}
                detailed={props.detailed}
                showHover={props.showHover}
              />
            )
        )}
      </div>
    </div>
  );
};
