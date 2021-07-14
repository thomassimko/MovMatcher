import React, { FC, useContext } from 'react';
import { ArrowForward, CloseRounded, EditRounded } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { Modal } from '../Modal';
import { MovieSearch } from '../search/MovieSearch';
import { SettingsContext } from '../settings/SettingsContext';

export type IRenameItemProps = {
  recommendation: MovieRecommendation;
  removeMovieRecommendation: () => void;
  outputFile: string;
};

export const RenameItem: FC<IRenameItemProps> = ({
  recommendation,
  removeMovieRecommendation,
  outputFile,
}) => {
  const [settings, dispatch] = useContext(SettingsContext);
  const outputPath = `${settings.outputFolder}/${outputFile}`;
  console.log(settings);
  return (
    <div
      className="grid p-2.5 text-sm items-center"
      style={{ gridTemplateColumns: '1fr min-content 1fr min-content' }}
    >
      <Tooltip title={recommendation.fullPath}>
        <div
          className="overflow-ellipsis whitespace-nowrap overflow-hidden pl-1 pr-1 cursor-pointer"
          style={{ direction: 'rtl', textAlign: 'left' }}
        >
          {recommendation.fullPath}
        </div>
      </Tooltip>
      <a className="text-gray-600 text-group-hover:border-gray-300 m-0">
        <ArrowForward className="text-gray-600" />
      </a>
      <Tooltip title={outputPath}>
        <div
          dir="rtl"
          className="overflow-ellipsis whitespace-nowrap overflow-hidden pl-1 pr-1 cursor-pointer"
          style={{ textAlign: 'left' }}
        >
          {outputFile || 'Undefined'}
        </div>
      </Tooltip>
      <div className="flex">
        <Modal
          button={
            <IconButton color="primary" aria-label="edit" size="small">
              <EditRounded />
            </IconButton>
          }
          modalTitle="Edit Match"
        >
          <MovieSearch showHover />
        </Modal>

        <IconButton
          color="primary"
          aria-label="edit"
          size="small"
          className="ml-1"
          onClick={() => removeMovieRecommendation()}
        >
          <CloseRounded />
        </IconButton>
      </div>
    </div>
  );
};
