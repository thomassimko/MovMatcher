import React, { FC, useState } from 'react';
import { Collapse } from '@material-ui/core';
import { renameFilesProgress } from '../utils/fileUtils';
import { Button } from './Button';
import { RenameDestinationOptions } from './rename/SelectOutputMethod';
import { ProgressModalItem } from './rename/ProgressModalItem';
import { IProgressMap } from '../models/progress';

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
  const initialProgressList: IProgressMap = recommendations.reduce(
    (prev, cur, index) => {
      prev[cur.recommendedMovie.title] = {
        ...cur,
        timeRemaining: undefined,
        speed: undefined,
        percentage: undefined,
      };
      return prev;
    },
    {} as IProgressMap
  );
  const [percentComplete, setPercentComplete] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [progressList, setProgressList] = useState(initialProgressList);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const startRename = async () => {
    setPercentComplete(0);
    setCompleted(false);
    setIsOpen(true);
    const totalSize = recommendations
      .map((rec) => rec.inputFile.size)
      .reduce((a, b) => a + b, 0);
    setProgressList(initialProgressList);
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
              setProgressList((progList) => {
                progList[rec.recommendedMovie.title] = {
                  ...progList[rec.recommendedMovie.title],
                  timeRemaining: prog.eta,
                  speed: prog.speed,
                  percentage: prog.percentage,
                };
                return progList;
              });
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
              <Collapse in={!showDetails}>
                <div className="relative flex-auto">
                  <ProgressModalItem
                    percentage={percentComplete}
                    text={
                      completed
                        ? 'Complete'
                        : `Renaming ${recommendations.length} files`
                    }
                    noBorder
                  />
                </div>
              </Collapse>
              <Collapse in={showDetails}>
                {Object.keys(progressList).map((key) => (
                  <ProgressModalItem
                    key={key}
                    percentage={progressList[key].percentage}
                    text={progressList[key].recommendedMovie.title}
                  />
                ))}
              </Collapse>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                {!completed ? (
                  <Button
                    onClick={() => setShowDetails((cur) => !cur)}
                    variant="outlined"
                    color="primary"
                  >
                    {showDetails ? 'Hide' : 'Show'} Details
                  </Button>
                ) : (
                  <Button
                    onClick={() => onComplete()}
                    variant="outlined"
                    color="secondary"
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </>
  );
};
