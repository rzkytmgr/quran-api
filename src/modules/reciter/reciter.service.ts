import { readDataset } from '@dataset/dataset-resolver';

interface IReciter {
  id: number;
  name: string;
  folder: {
    ayah: string;
    surah: string;
  };
}

let reciters: IReciter[] | undefined;
let recitersById: Map<number, IReciter> | undefined;

const loadReciters = (): IReciter[] => {
  reciters ??= readDataset<IReciter[]>('entire-reciters');
  return reciters;
};

const getAllReciters = (): IReciter[] => {
  return loadReciters();
};

const findReciterById = (id: number): IReciter | undefined => {
  recitersById ??= new Map(loadReciters().map((reciter) => [reciter.id, reciter]));
  return recitersById.get(id);
};

const getReciterIds = (): number[] => {
  return loadReciters().map((reciter) => reciter.id);
};

export { findReciterById, getAllReciters, getReciterIds };
export type { IReciter };
