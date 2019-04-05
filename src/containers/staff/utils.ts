import { StaffState } from '../../store/types';

type Keyname = 'birthDate' | 'rating';

export const sortByKeyName = (list: StaffState[], keyName: Keyname) : StaffState[] => {
  const compare = (a: StaffState, b: StaffState) => {
    if (a[keyName] < b[keyName])
      return -1;
    if (a[keyName] > b[keyName])
      return 1;
    return 0;
  }
  return list.slice().sort(compare);
}

