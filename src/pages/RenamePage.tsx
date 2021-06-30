import React, { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { RenameItem } from '../components/rename/RenameItem';
import { searchMovieFuzzy } from '../utils/elasticDB';
import { Card } from '../components/Card';
import { SelectOutputFormat } from '../components/rename/SelectOutputFormat';
import { formatOutput } from '../utils/outputFormatter';
import {
  RenameDestinationOptions,
  SelectOutputMethod,
} from '../components/rename/SelectOutputMethod';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RenamePageProps {}

export const RenamePage: FC<RenamePageProps> = (props: RenamePageProps) => {
  const [itemsToRename, setItemsToRename] = useState<MovieRecommendation[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>();
  const [renameMethod, setRenameMethod] = useState(
    RenameDestinationOptions.COPY
  );

  const loadFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return;
    }
    const movieRecommendations = Promise.all(
      Array.from(fileList)
        .filter((file) => !file.name.startsWith('.'))
        .map(async (file) => {
          const movies = await searchMovieFuzzy(file.path);
          return {
            fileName: file.name,
            path: file.path,
            recommendedMovie: movies.length === 0 ? null : movies[0],
            extension: file.name.split('.').pop(),
          };
        })
    );
    setItemsToRename(await movieRecommendations);
  };

  const removeRecommendation = (rec: MovieRecommendation) => {
    setItemsToRename((prevState) => {
      return prevState.filter((item) => item !== rec);
    });
  };

  return (
    <Card extraClasses="flex flex-col flex-grow">
      <div className="flex">
        <label
          htmlFor="selectDirectory"
          className="bg-red-400 hover:bg-red-300 rounded text-white py-2 px-4 inline-block cursor-pointer"
        >
          Select Directory
        </label>
        <input
          id="selectDirectory"
          directory=""
          webkitdirectory=""
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => loadFiles(e.target.files)}
        />
        <SelectOutputFormat
          onOutputFormatChange={(format: string) => setOutputFormat(format)}
        />
      </div>
      <div className="flex-grow mt-3 overflow-y-scroll divide-y p-2 border border-gray-300 rounded shadow-inner">
        {itemsToRename.map((recommendation) => (
          <RenameItem
            key={recommendation.path}
            recommendation={recommendation}
            removeMovieRecommendation={() =>
              removeRecommendation(recommendation)
            }
            outputPath={formatOutput(recommendation, outputFormat)}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <Button variant="contained" color="primary">
          Rename
        </Button>
        <SelectOutputMethod
          defaultValue={renameMethod}
          onOutputMethodChange={(method: RenameDestinationOptions) =>
            setRenameMethod(method)
          }
        />
      </div>
    </Card>
  );
};
