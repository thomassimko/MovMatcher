import React, { FC } from 'react';

export interface ICardProps {
  extraClasses?: string;
}

export const Card: FC<ICardProps> = ({ extraClasses, children }) => {
  return (
    <div className={`bg-white shadow p-2 rounded ${extraClasses}`}>{children}</div>
  );
};

export default Card;
