import React, { FC } from 'react';
import { MovieSearch } from '../components/search/MovieSearch';
import { Card } from '../components/Card';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchPageProps {}

export const SearchPage: FC<SearchPageProps> = (props: SearchPageProps) => {
  return (
    <Card extraClasses="flex-grow overflow-y-scroll">
      <MovieSearch detailed />
    </Card>
  );
};
