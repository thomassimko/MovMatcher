import React, { FC, useState } from 'react';
import { SearchBar } from '../components/search/SearchBar';
import { MovieListItem } from '../components/search/MovieListItem';
import { searchMovie, searchMovieFuzzy } from '../utils/elasticDB';
import { MovieSearch } from '../components/search/MovieSearch';
import { Card } from '../components/Card';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchPageProps {}

export const SearchPage: FC<SearchPageProps> = (props: SearchPageProps) => {
  return (
    <Card extraClasses="flex-grow">
      <MovieSearch detailed />
    </Card>
  );
};
