import React, { FC } from 'react';
import { ArrowForward, CloseRounded, EditRounded } from '@material-ui/icons';
import { Modal } from '../Modal';
import { MovieSearch } from '../search/MovieSearch';

export interface IRenameItemProps {
  recommendation: MovieRecommendation;
  removeMovieRecommendation: () => void;
  outputPath: string;
}

export const RenameItem: FC<IRenameItemProps> = ({
  recommendation,
  removeMovieRecommendation,
  outputPath,
}) => {
  return (
    <div
      className="grid p-2.5 text-sm"
      style={{ gridTemplateColumns: '1fr min-content 1fr min-content' }}
    >
      <div
        className="overflow-ellipsis whitespace-nowrap overflow-hidden pl-1 pr-1"
        style={{ direction: 'rtl', textAlign: 'left' }}
      >
        {recommendation.path}
      </div>
      <a className="text-gray-600 text-group-hover:border-gray-300 m-0">
        <ArrowForward className="text-gray-600" />
      </a>
      <div
        className="overflow-ellipsis whitespace-nowrap overflow-hidden pl-1 pr-1"
        style={{ direction: 'rtl', textAlign: 'left' }}
      >
        {outputPath}
      </div>
      <div className="flex">
        <Modal
          button={
            <a className="text-red-400 p-0 cursor-pointer hover:text-red-300 m-0 ml-1">
              <EditRounded />
            </a>
          }
          modalTitle="Edit Match"
        >
          <MovieSearch showHover />
        </Modal>

        <a
          className="text-red-400 p-0 cursor-pointer hover:text-red-300 m-0 ml-1"
          onClick={() => removeMovieRecommendation()}
        >
          <CloseRounded />
        </a>
      </div>
    </div>
  );
};
