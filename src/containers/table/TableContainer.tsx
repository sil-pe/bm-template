import * as React from 'react';
import {
  Order,
  SortingOrder,
  SortingFunction,
  SortingColumnGeneratorFunction,
  ToVoid
} from './types';
import {Table, Value} from '../../components/Table';

const mockData: Value[] = [];

for (let i = 0; i < 10; i++) {
  const x = Math.round(Math.random() * 9 + 1);
  mockData.push({
    x,
    y: Math.random().toString(32).replace(/[^a-z]+/g, '').substr(0, x)
  })
}

interface State {
  data: Value[];
  xSortingOrder: SortingOrder;
  ySortingOrder: SortingOrder;
  searchText: string
}

interface Props {

}

export class TableContainer extends React.PureComponent<Props, State> {
  state = {
    data: mockData,
    xSortingOrder: Order.ASC,
    ySortingOrder: Order.ASC,
    searchText: ''
  };

  constructor(props: Props) {
    super(props);

    this.sortXColumn = this.getSortColumnFunction(
      this.sortX,
      () => this.setState({ xSortingOrder: this.state.xSortingOrder * -1 })
    );

    this.sortYColumn = this.getSortColumnFunction(
      this.sortY,
      () => this.setState({ ySortingOrder: this.state.ySortingOrder * -1 })
    );
  }

  sortX: SortingFunction = (aValue, bValue) => (aValue.x - bValue.x) * this.state.xSortingOrder;

  sortY: SortingFunction = (aValue, bValue) => aValue.y.localeCompare(bValue.y) * this.state.ySortingOrder;

  getSortColumnFunction: SortingColumnGeneratorFunction = (sortingFunction, setStateCallback) => () => {
    const data = this.state.data.concat();

    data.sort(sortingFunction);

    this.setState({ data }, setStateCallback)
  };

  sortXColumn: ToVoid;
  sortYColumn: ToVoid;

  filterBySearchText: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const searchText = event.currentTarget.value.trim();

    this.setState({
      searchText,
      data: searchText ? mockData.filter(({ y }) => y.includes(searchText)) : mockData
    })
  };

  render() {
    return (
      <>
        <input type="text" value={this.state.searchText} onChange={this.filterBySearchText}/>
        <Table sortX={this.sortXColumn} sortY={this.sortYColumn} data={this.state.data}/>
      </>
    )
  }
}
