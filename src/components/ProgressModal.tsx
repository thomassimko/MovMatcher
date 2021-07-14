import React, { FC } from 'react';
import { CloseRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Button } from './Button';

export type IProgressModalProps = {
  modalTitle: string;
  percentComplete: number;
};

export const ProgressModal: FC<IProgressModalProps> = ({
  modalTitle,
  percentComplete,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="relative m-auto overflow-y-scroll
        border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          style={{ maxHeight: '80%', maxWidth: '50%' }}
        >
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">{modalTitle}</h3>
          </div>
          <div className="relative p-6 flex-auto">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                <div
                  style={{ width: `${percentComplete}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};
