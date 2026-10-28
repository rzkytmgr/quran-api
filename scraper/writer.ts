import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface IDbFileSpec {
  directories: string[];
  languageFolder: string | null;
  filename: string;
  data: unknown;
}

const serializeDbContent = (data: unknown): string => JSON.stringify(data).replace(/\\\\/g, '\\');

export const writeJsonFileAtomically = async (filePath: string, content: string): Promise<void> => {
  await mkdir(path.dirname(filePath), { recursive: true });

  const temporaryFilePath = `${filePath}.writing`;
  await writeFile(temporaryFilePath, content, 'utf-8');
  await rename(temporaryFilePath, filePath);
};

export const writeDatabaseFiles = async (outputDir: string, fileSpecs: IDbFileSpec[]): Promise<string[]> => {
  const writtenFilePaths: string[] = [];

  for (const fileSpec of fileSpecs) {
    const filePath = path.resolve(outputDir, ...fileSpec.directories, fileSpec.languageFolder ?? '', fileSpec.filename);
    await writeJsonFileAtomically(filePath, serializeDbContent(fileSpec.data));
    writtenFilePaths.push(filePath);
  }

  return writtenFilePaths;
};
