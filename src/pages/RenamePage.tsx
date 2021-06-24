import React, { FC, useState } from 'react';
import { RenameItem } from '../components/rename/RenameItem';
import { searchMovieFuzzy } from '../utils/elasticDB';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RenamePageProps {}

export const RenamePage: FC<RenamePageProps> = (props: RenamePageProps) => {
  const [itemsToRename, setItemsToRename] = useState<MovieRecommendation[]>([]);

  const loadFiles = async (fileList: FileList | null) => {
    console.log(fileList);
    if (!fileList || fileList.length === 0) {
      return;
    }
    const movieRecommendations = Promise.all(
      Array.from(fileList)
        .filter((file) => !file.name.startsWith('.'))
        .map(async (file, index) => {
          const movies = await searchMovieFuzzy(file.path);
          return {
            fileName: file.name,
            path: file.path,
            recommendedMovie: movies.length === 0 ? null : movies[0],
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <div className="bg-white shadow">
      <label
        htmlFor="selectDirectory"
        className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4 m-2 inline-block cursor-pointer"
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
      <ul className="divide-y divide-gray-300 w-full h-3/4">
        {itemsToRename.map((recommendation) => (
          <RenameItem
            key={recommendation.path}
            recommendation={recommendation}
            removeMovieRecommendation={() =>
              removeRecommendation(recommendation)
            }
          />
        ))}
      </ul>
    </div>
  );
};
