import React, { FC, useContext, useEffect, useState } from 'react';
import { RenameItem } from '../components/rename/RenameItem';
import { searchMovieFuzzy } from '../utils/elasticDB';
import { Card } from '../components/Card';
import { SelectOutputFormat } from '../components/rename/SelectOutputFormat';
import { formatOutput } from '../utils/outputFormatter';
import {
  RenameDestinationOptions,
  SelectOutputMethod,
} from '../components/rename/SelectOutputMethod';
import {
  getFilesInDir,
  FileInDirectory,
  getFileSize,
} from '../utils/fileUtils';
import { SettingsContext } from '../components/settings/SettingsContext';
import { DirectoryPicker } from '../components/DirectoryPicker';
import { ProgressModal } from '../components/ProgressModal';

export const RenamePage: FC = (props) => {
  const [itemsToRename, setItemsToRename] = useState<MovieRecommendation[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>();
  const [renameMethod, setRenameMethod] = useState<RenameDestinationOptions>();
  const [settings, dispatch] = useContext(SettingsContext);

  useEffect(() => {
    setItemsToRename((items) =>
      items.map((item) => {
        const relativeOutput = formatOutput(item, outputFormat);
        return {
          ...item,
          outputFile: `${settings.outputFolder}/${relativeOutput}`,
        };
      })
    );
  }, [outputFormat]);
  const loadFiles = async (directory: string) => {
    const files: FileInDirectory[] = await getFilesInDir(directory);
    const movieRecommendations = Promise.all(
      files.map(async (file) => {
        const movies = await searchMovieFuzzy(file.relativePath);
        return {
          inputFile: {
            fileName: file.name,
            fullPath: file.fullPath,
            relativePath: file.relativePath,
            size: getFileSize(file.fullPath),
            extension: file.extension,
          },
          recommendedMovie: movies.length === 0 ? null : movies[0],
          outputFile: undefined,
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

  // const doRename = () => {
  //   const duplicates = itemsToRename.some(
  //     (x) => itemsToRename.indexOf(x) !== itemsToRename.lastIndexOf(x)
  //   );
  //   if (duplicates) {
  //     return;
  //   }
  //   const renameRequests: RenameRequest[] = itemsToRename.map((item) => {
  //     const src = item.fullPath;
  //     const dest = formatOutput(item, outputFormat);
  //     const destWithPath = `${state.outputFolder}/${dest}`;
  //     return {
  //       inputFile: src,
  //       outputFile: destWithPath,
  //       size: getFileSize(src),
  //       method: renameMethod,
  //       title: item.recommendedMovie.title,
  //     };
  //   });
  //   setRenamingFiles(true);
  //
  // };

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
            key={recommendation.inputFile.fullPath}
            recommendation={recommendation}
            removeMovieRecommendation={() =>
              removeRecommendation(recommendation)
            }
          />
        ))}
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <ProgressModal
          modalTitle="Progress"
          recommendations={itemsToRename}
          disabled={!outputFormat || renameMethod === undefined}
          method={renameMethod}
          format={outputFormat}
        />
        <SelectOutputMethod
          onOutputMethodChange={(method: RenameDestinationOptions) =>
            setRenameMethod(method)
          }
        />
      </div>
    </Card>
  );
};

export default RenamePage;
