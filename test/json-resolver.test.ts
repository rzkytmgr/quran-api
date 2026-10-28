import { describe, expect, test } from 'vitest';
import { readDataset } from '../src/dataset/dataset-resolver';

describe('dataset resolver', () => {
  test('reads dataset by dataset name', () => {
    const dataset = readDataset<Array<Record<string, unknown>>>('entire-reciters');
    expect(Array.isArray(dataset)).toBe(true);
    expect(dataset[0]).toHaveProperty('id');
  });

  test('reads dataset by nested path segments', () => {
    const preBismillah = readDataset<Record<string, unknown>>(['translation', 'lang', 'en', 'pre-bismillah']);
    expect(preBismillah).toBeInstanceOf(Object);
  });

  test('throws for non-existing dataset file', () => {
    expect(() => readDataset('file-does-not-exist')).toThrow();
    expect(() => readDataset(['also', 'accepts', 'array'])).toThrow();
  });

  test('throws when the dataset path escapes the data folder', () => {
    expect(() => readDataset(['..', 'package.json'])).toThrow(/escapes the data folder/);
    expect(() => readDataset(['translation', '..', '..', 'package.json'])).toThrow(/escapes the data folder/);
  });
});
