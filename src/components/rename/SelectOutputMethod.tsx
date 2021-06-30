import React, { FC } from 'react';
import Select from 'react-select';

export interface ISelectOutputMethodProps {
  defaultValue: RenameDestinationOptions;
  onOutputMethodChange: (method: RenameDestinationOptions) => void;
}

export enum RenameDestinationOptions {
  COPY,
  MOVE,
  IN_PLACE,
}

export const SelectOutputMethod: FC<ISelectOutputMethodProps> = ({
  defaultValue,
  onOutputMethodChange,
}) => {
  const options = [
    { value: RenameDestinationOptions.COPY, label: 'Copy' },
    { value: RenameDestinationOptions.MOVE, label: 'Move' },
    { value: RenameDestinationOptions.IN_PLACE, label: 'In place' },
  ];

  return (
    <div className="flex flex-grow justify-end mr-4">
      <span className="mx-3" style={{ lineHeight: 2.2 }}>
        Output Method:
      </span>
      <div className="w-52">
        <Select
          defaultValue={options[defaultValue]}
          menuPlacement="top"
          options={options}
          onChange={({ value }) => onOutputMethodChange(value)}
        />
      </div>
    </div>
  );
};
