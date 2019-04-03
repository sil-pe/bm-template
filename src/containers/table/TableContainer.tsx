import * as React from 'react';
import {Table, Value} from '../../components/Table';
import {ChangeEvent} from 'react';

const mockData: Value[] = [];

for (let i = 0; i < 10; i++) {
  const x = Math.round(Math.random() * 9 + 1);
  mockData.push({
    x,
    y: Math.random().toString(32).replace(/[^a-z]+/, '').substr(0, x)
  })
}

const enum Order {
  ASC = "ASC",
  DESC = "DESC",
}


type SortingOrder = Order.ASC | Order.DESC;

interface State {
  data: Value[];
  xSortingOrder: SortingOrder;
  ySortingOrder: SortingOrder;
  searchText: string
}

export class TableContainer extends React.PureComponent<{}, State> {
  state = {
    data: mockData,
    xSortingOrder: Order.ASC,
    ySortingOrder: Order.ASC,
    searchText: ''
  }

  sortXColumn: () => void = () => {
    const data = this.state.data.concat();

    if (this.state.xSortingOrder === Order.ASC) {
      data.sort((aValue, bValue) => aValue.x - bValue.x)
    } else {
      data.sort((aValue, bValue) => bValue.x - aValue.x)
    }

    this.setState(({ xSortingOrder }) => ({
      data,
      xSortingOrder: xSortingOrder === Order.ASC ? Order.DESC : Order.ASC,
    }))
  }

  sortYColumn: () => void = () => {
    const data = this.state.data.concat();

    if (this.state.ySortingOrder === Order.ASC) {
      data.sort((aValue, bValue) => aValue.y.localeCompare(bValue.y))
    } else {
      data.sort((aValue, bValue) => bValue.y.localeCompare(aValue.y))
    }

    this.setState(({ ySortingOrder }) => ({
      data,
      ySortingOrder: ySortingOrder === Order.ASC ? Order.DESC : Order.ASC,
    }))
  }

  filterBySearchText: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const searchText = event.currentTarget.value.trim();

    this.setState({
      searchText,
      data: searchText ? mockData.filter(({y}) => y.includes(searchText)) : mockData
    })
  }

  render() {
    return (
      <>
        <input type="text" value={this.state.searchText} onChange={this.filterBySearchText}/>
        <Table sortX={this.sortXColumn} sortY={this.sortYColumn} data={this.state.data}/>
      </>
    )
  }
}
