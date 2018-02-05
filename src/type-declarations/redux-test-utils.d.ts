declare module 'redux-test-utils' {
  export const createMockStore: (state: any) => Store;
}

declare class Store {
  getAction(action: string): any;
  dispatch(action: any): void;
  getState(): any;
}
