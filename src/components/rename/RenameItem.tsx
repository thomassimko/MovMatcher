import React, { FC } from 'react';
import { ArrowForward, CloseRounded, EditRounded } from '@material-ui/icons';
import { Modal } from '../Modal';
import { SearchPage } from '../../pages/SearchPage';

export interface IRenameItemProps {
  recommendation: MovieRecommendation;
  removeMovieRecommendation: () => void;
}

export const RenameItem: FC<IRenameItemProps> = ({
  recommendation,
  removeMovieRecommendation,
}) => {
  return (
    <div
      className="grid p-2.5"
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
        {recommendation.recommendedMovie.title}
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
          <SearchPage />
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
