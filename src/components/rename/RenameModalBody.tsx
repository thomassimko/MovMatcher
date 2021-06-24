import React, { FC } from 'react';
import { SearchPage } from '../../pages/SearchPage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRenameModalBodyProps {}

export const RenameModalBody: FC<IRenameModalBodyProps> = (
  props: IRenameModalBodyProps
) => {
  return <SearchPage />;
};
