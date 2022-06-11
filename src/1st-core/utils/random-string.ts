import { randomInt } from './random-int';

export type DictionaryKey = 'low' | 'up' | 'dig';

const LOW = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const UP = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const DIG = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Dictionaries: Record<DictionaryKey, Array<string>> = {
  low: LOW,
  up: UP,
  dig: DIG,
};

function makeDictionary(dictionaryKeys: Array<DictionaryKey>): Array<string> {
  return [].concat(...dictionaryKeys.map((dictionaryKey) => Dictionaries[dictionaryKey]));;
}

export function randomString(size: number, dictionaryKeys?: Array<DictionaryKey>): string {
  const word = [];
  const dictionary = makeDictionary(dictionaryKeys || ['low', 'up', 'dig']);

  for (let i = 0; i < size; i++) {
    word.push(dictionary[randomInt(0, dictionary.length - 1)]);
  }

  return word.join('');
}
