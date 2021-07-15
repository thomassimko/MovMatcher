import React, { FC, useState } from 'react';
import { Collapse } from '@material-ui/core';
import { renameFilesProgress } from '../utils/fileUtils';
import { Button } from './Button';
import { RenameDestinationOptions } from './rename/SelectOutputMethod';

export type IProgressModalProps = {
  modalTitle: string;
  recommendations: MovieRecommendation[];
  disabled: boolean;
  method: RenameDestinationOptions;
  format: string;
};

export const ProgressModal: FC<IProgressModalProps> = ({
  modalTitle,
  recommendations,
  disabled,
}) => {
  const [percentComplete, setPercentComplete] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const startRename = async () => {
    setPercentComplete(0);
    setCompleted(false);
    setIsOpen(true);
    const totalSize = recommendations
      .map((rec) => rec.inputFile.size)
      .reduce((a, b) => a + b, 0);
    let transferred = 0;
    await Promise.all(
      recommendations.map(async (rec) => {
        return new Promise((resolve, reject) => {
          renameFilesProgress(
            rec.inputFile.fullPath,
            rec.outputFile,
            rec.inputFile.size
          )
            .on('progress', (prog) => {
              setPercentComplete(
                ((prog.transferred + transferred) * 100) / totalSize
              );
            })
            .once('finish', () => {
              transferred += rec.inputFile.size;
              resolve();
            });
        });
      })
    );
    setCompleted(true);
  };
  const onComplete = () => {
    setIsOpen(false);
    setPercentComplete(0);
    setCompleted(false);
  };
  return (
    <>
      <Button disabled={disabled} onClick={() => startRename()}>
        Rename
      </Button>
      {isOpen && (
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
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs inline-block text-gray-500">
                        {completed
                          ? 'Complete'
                          : `Renaming ${recommendations.length} files`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold inline-block transition-all ${
                          completed ? 'text-green-500' : 'text-red-400'
                        }`}
                      >
                        {Math.max(1, Math.floor(percentComplete))}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                    <div
                      style={{ width: `${percentComplete}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all ${
                        completed ? 'bg-green-500' : 'bg-red-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
              {completed}
              <Collapse in={completed}>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button
                    onClick={() => onComplete()}
                    variant="outlined"
                    color="secondary"
                  >
                    Close
                  </Button>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </>
  );
};
