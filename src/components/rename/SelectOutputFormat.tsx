import React, { FC } from 'react';
import Select from 'react-select';

export interface ISelectOutputFormatProps {
  onOutputFormatChange: (format: string) => void;
}

export const SelectOutputFormat: FC<ISelectOutputFormatProps> = ({
  onOutputFormatChange,
}) => {
  const options = [
    { value: '{title} ({year})/{title} ({year}).{ext} ', label: 'Plex' },
    { value: '{title} ({year}).{ext}', label: 'Title (Year)' },
  ];

  return (
    <div className="flex flex-grow justify-end">
      <span className="mx-3" style={{ lineHeight: 2.2 }}>
        Output format:
      </span>
      <div className="w-52">
        <Select
          options={options}
          onChange={({ value }) => onOutputFormatChange(value)}
        />
      </div>
    </div>
  );
};
