import React, { FC, useContext, useState } from 'react';
import { RenameItem } from '../components/rename/RenameItem';
import { searchMovieFuzzy } from '../utils/elasticDB';
import { Card } from '../components/Card';
import { SelectOutputFormat } from '../components/rename/SelectOutputFormat';
import { formatOutput } from '../utils/outputFormatter';
import {
  RenameDestinationOptions,
  SelectOutputMethod,
} from '../components/rename/SelectOutputMethod';
import { Button } from '../components/Button';
import {
  renameFiles,
  getFilesInDir,
  FileInDirectory,
} from '../utils/fileUtils';
import { SettingsContext } from '../components/settings/SettingsContext';
import { DirectoryPicker } from '../components/DirectoryPicker';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RenamePageProps {}

export const RenamePage: FC<RenamePageProps> = (props: RenamePageProps) => {
  const [itemsToRename, setItemsToRename] = useState<MovieRecommendation[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>();
  const [renameMethod, setRenameMethod] = useState<RenameDestinationOptions>();
  const [state, dispatch] = useContext(SettingsContext);

  console.log(outputFormat, renameMethod);

  const loadFiles = async (directory: string) => {
    const files: FileInDirectory[] = await getFilesInDir(directory);
    const movieRecommendations = Promise.all(
      files.map(async (file) => {
        const movies = await searchMovieFuzzy(file.relativePath);
        return {
          fileName: file.name,
          fullPath: file.fullPath,
          relativePath: file.relativePath,
          recommendedMovie: movies.length === 0 ? null : movies[0],
          extension: file.extension,
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

  const doRename = async () => {
    const duplicates = itemsToRename.some(
      (x) => itemsToRename.indexOf(x) !== itemsToRename.lastIndexOf(x)
    );
    if (duplicates) {
      return;
    }

    const promises = Promise.all(
      itemsToRename.map((item) => {
        const src = item.fullPath;
        const dest = formatOutput(item, outputFormat);
        const destWithPath = `${state.outputFolder}/${dest}`;
        return renameFiles(src, destWithPath, renameMethod);
      })
    );
  };

  return (
    <Card extraClasses="flex flex-col flex-grow overflow-y-scroll">
      <div className="flex">
        <DirectoryPicker
          onChange={(dir) => loadFiles(dir)}
          buttonText="Select Input Directory"
        />
        <SelectOutputFormat
          onOutputFormatChange={(format: string) => setOutputFormat(format)}
        />
      </div>
      <div className="flex-grow mt-3 overflow-y-scroll divide-y p-2 border border-gray-300 rounded shadow-inner">
        {itemsToRename.map((recommendation) => (
          <RenameItem
            key={recommendation.fullPath}
            recommendation={recommendation}
            removeMovieRecommendation={() =>
              removeRecommendation(recommendation)
            }
            outputFile={formatOutput(recommendation, outputFormat)}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <Button
          disabled={!outputFormat || renameMethod === undefined}
          onClick={() => doRename()}
        >
          Rename
        </Button>
        <SelectOutputMethod
          onOutputMethodChange={(method: RenameDestinationOptions) =>
            setRenameMethod(method)
          }
        />
      </div>
    </Card>
  );
};
