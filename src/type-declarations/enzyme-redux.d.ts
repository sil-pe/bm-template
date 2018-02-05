declare module 'enzyme-redux' {
  import {ShallowWrapper} from 'enzyme';
  export const shallowWithStore: <P = any, S = any>(component: JSX.Element, mockStore: Store) =>
    ShallowWrapper<P, S>;
}

