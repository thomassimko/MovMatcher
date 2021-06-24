import React, { FC } from 'react';

export interface IRenameCardSectionProps {
  items: string[];
  title: string;
}

export const RenameCardSection: FC<IRenameCardSectionProps> = ({
  items,
  title,
}) => {
  return (
    <div className="bg-white shadow flex-grow flex flex-col">
      <h2 className="text-gray-800 text-3xl font-semibold p-4 shadow">
        {title}
      </h2>
      <ul className="divide-y divide-gray-300 overflow-y-scroll flex-grow">
        {items.map((item) => (
          <li key={item} className="p-4 hover:bg-gray-50 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
