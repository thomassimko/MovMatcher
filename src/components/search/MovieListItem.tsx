import React, { FC } from 'react';
import { MovieCreation } from '@material-ui/icons';

export interface MovieListItemProps {
  movie: Movie;
  detailed?: boolean;
  showHover?: boolean;
}

export const MovieListItem: FC<MovieListItemProps> = ({
  movie,
  detailed,
  showHover,
}) => {
  const posterSize = detailed ? 24 : 16;
  return (
    <div
      className={`flex ${detailed ? 'p-4' : 'p-2'} ${
        showHover && 'hover:bg-gray-50 cursor-pointer'
      }`}
    >
      <div className="flex-shrink-0 flex-grow-0 pr-4">
        {movie.poster_path ? (
          <img
            alt={`${movie.title} poster`}
            src={movie.poster_path}
            className={`h-${posterSize} w-${posterSize}rounded mx-auto`}
          />
        ) : (
          <div className="bg-gray-100 rounded text-center">
            <MovieCreation className="m-3" />
          </div>
        )}
      </div>
      <div className="flex-grow pr-4">
        <h3 className="font-semibold text-black">{movie.title}</h3>
        {detailed && <p>{movie.overview}</p>}
      </div>
      <div className="flex-grow-0 flex-shrink-0 italic">
        {movie.release_year}
      </div>
    </div>
  );
};
