import React, { FC, useState } from 'react';
import { SearchBar } from './SearchBar';
import { MovieListItem } from './MovieListItem';
import { searchMovieFuzzy } from '../../utils/elasticDB';
import Loader from '../Loader';

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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <SearchBar doSearch={(text?: string) => doSearch(text)} />
      <div className="flex-grow mt-3 overflow-y-scroll divide-y p-2 border border-gray-300 rounded shadow-inner">
        {loading && <Loader />}
        {!loading && movieMatches.length === 0 && (
          <div className="bg-gray-100 text-center rounded mt-4 p-3 text-gray-500">
            No items match your search
          </div>
        )}
        {!loading &&
          movieMatches.map(
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
