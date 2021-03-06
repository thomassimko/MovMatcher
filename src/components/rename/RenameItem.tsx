import React, { FC, useContext } from 'react';
import { ArrowForward, CloseRounded, EditRounded } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { Modal } from '../Modal';
import { MovieSearch } from '../search/MovieSearch';

export type IRenameItemProps = {
  recommendation: MovieRecommendation;
  removeMovieRecommendation: () => void;
};

export const RenameItem: FC<IRenameItemProps> = ({
  recommendation,
  removeMovieRecommendation,
}) => {
  return (
    <div
      className="grid p-2.5 text-sm items-center"
      style={{ gridTemplateColumns: '1fr min-content 1fr min-content' }}
    >
      <Tooltip title={recommendation.inputFile.fullPath}>
        <div
          className="overflow-ellipsis whitespace-nowrap overflow-hidden pl-1 pr-1 cursor-pointer"
          style={{ direction: 'rtl', textAlign: 'left' }}
        >
          {recommendation.inputFile.fullPath}
        </div>
      </Tooltip>
      <a className="text-gray-600 text-group-hover:border-gray-300 m-0">
        <ArrowForward className="text-gray-600" />
      </a>
      <Tooltip title={recommendation.outputFile || 'Undefined'}>
        <div
          dir="rtl"
          className="overflow-ellipsis whitespace-nowrap overflow-hidden pl-1 pr-1 cursor-pointer"
          style={{ textAlign: 'left' }}
        >
          {recommendation.outputFile || 'Undefined'}
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
