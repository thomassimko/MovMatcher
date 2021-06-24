import { readdir } from 'fs/promises';

export default function getFilesInDir(folderPath: string) {
  return readdir(folderPath);
}
