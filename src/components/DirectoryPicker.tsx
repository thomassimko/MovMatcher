import React, { FC } from 'react';
import { Button } from './Button';

const { dialog } = require('electron').remote;

export type DirectoryPickerProps = {
  onChange: (path: string) => void;
  buttonText: string;
};

export const DirectoryPicker: FC<DirectoryPickerProps> = ({
  onChange,
  buttonText,
}) => {
  const openPicker = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (!canceled) {
      onChange(filePaths[0]);
    }
  };
  return <Button onClick={() => openPicker()}>{buttonText}</Button>;
};

export default DirectoryPicker;
