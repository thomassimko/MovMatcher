import React, { FC, useState } from 'react';
import { Search } from '@material-ui/icons';
import { Button } from '../Button';

export interface ISearchBarProps {
  doSearch: (text?: string) => void;
}

export const SearchBar: FC<ISearchBarProps> = (props) => {
  const [searchText, setSearchText] = useState<string>();

  return (
    <div className="flex">
      <span className="w-auto flex justify-end items-center text-gray-500 p-2">
        <Search className="text-3xl" />
      </span>
      <input
        className="rounded p-2 flex-grow mr-2 border-b"
        type="text"
        placeholder="Search for movie"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' && props.doSearch(searchText)
        }
      />
      <Button onClick={() => props.doSearch(searchText)}>
        <p className="font-semibold text-xs">Search</p>
      </Button>
    </div>
  );
};
