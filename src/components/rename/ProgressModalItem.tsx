import React, { FC, useEffect, useState } from 'react';
import { IProgressItem } from '../../models/progress';

export type IProgressModalItemProps = {
  percentage: number;
  text: string;
  noBorder?: boolean;
};

export const ProgressModalItem: FC<IProgressModalItemProps> = ({
  percentage,
  text,
  noBorder,
}) => {
  const [completed, setCompleted] = useState<boolean>(false);
  useEffect(() => {
    if (percentage === 100) {
      setCompleted(true);
    }
  }, [percentage]);
  return (
    <div className={`mx-6 py-1 ${noBorder || 'border-t'} progress-modal-item`}>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs inline-block text-gray-500">{text}</span>
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-semibold inline-block transition-all ${
              completed ? 'text-green-500' : 'text-red-400'
            }`}
          >
            {Math.max(1, Math.floor(percentage))}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
        <div
          style={{ width: `${percentage}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all ${
            completed ? 'bg-green-500' : 'bg-red-400'
          }`}
        />
      </div>
    </div>
  );
};

export default ProgressModalItem;
