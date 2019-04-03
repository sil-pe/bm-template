import {Value} from 'components/Table';

export const enum Order {
  ASC = 1,
  DESC = -1,
}

export type SortingOrder = Order.ASC | Order.DESC;

export type ToVoid = () => void;

export type SortingFunction = (aValue: Value, bValue: Value) => number;

export type SortingColumnGeneratorFunction = (sortingFunction: SortingFunction, setStateCallback: ToVoid) => () => void;
