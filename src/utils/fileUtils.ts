import { promises as fs } from 'fs';
import path from 'path';
import { RenameDestinationOptions } from '../components/rename/SelectOutputMethod';

export type FileInDirectory = {
  name: string;
  fullPath: string;
  extension: string;
  relativePath: string;
};

export async function getFilesInDir(
  folderPath: string,
  baseSearchDirectory?: string
) {
  const out: FileInDirectory[] = [];
  const filesWithHidden = await fs.readdir(folderPath);
  const files = filesWithHidden.filter((item) => !/(^|\/)\.[^/.]/g.test(item));
  const relativeDir = baseSearchDirectory || folderPath;
  await Promise.all(
    files.map(async (file) => {
      if ((await fs.stat(`${folderPath}/${file}`)).isDirectory()) {
        const filesInDir = await getFilesInDir(
          `${folderPath}/${file}`,
          relativeDir
        );
        out.push(...filesInDir);
      } else {
        const fullPath = `${folderPath}/${file}`;
        const formatted = {
          name: file,
          fullPath,
          extension: file.split('.').pop(),
          relativePath: fullPath.replace(relativeDir, ''),
        };
        out.push(formatted);
      }
    })
  );

  return out;
}

export async function renameFiles(
  oldPath: string,
  newPath: string,
  method: RenameDestinationOptions
) {
  await fs.mkdir(path.dirname(newPath), { recursive: true });
  switch (method) {
    case RenameDestinationOptions.COPY:
      return fs.copyFile(oldPath.trim(), newPath.trim());
    case RenameDestinationOptions.MOVE:
      return fs.rename(oldPath.trim(), newPath.trim());
    case RenameDestinationOptions.IN_PLACE:
      return null;
    default:
      return null;
  }
}
