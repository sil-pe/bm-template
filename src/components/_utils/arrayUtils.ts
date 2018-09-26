import {zip} from 'lodash';

export type PairWise = <T>(arr: T[]) => T[][];
export const pairWise: PairWise = (arr => zip(arr.slice(0, -1), arr.slice(1))) as PairWise;

