import React, { FC, useState } from 'react';
import { SearchBar } from '../components/search/SearchBar';
import { MovieListItem } from '../components/search/MovieListItem';
import { searchMovie, searchMovieFuzzy } from '../utils/elasticDB';
import { MovieSearch } from '../components/search/MovieSearch';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchPageProps {}

export const SearchPage: FC<SearchPageProps> = (props: SearchPageProps) => {
  return (
    <div className="flex flex-col h-full">
      <MovieSearch detailed />
    </div>
  );
};
