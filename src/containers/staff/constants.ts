import {StaffState} from 'src/store/types';

export const initialStaffState: StaffState[] = [
  {
      name: 'Florent',
      role: 'Developer',
      rating: 3,
      birthDate: '1991-10-19'
   },
  {
      name: 'Saurabh',
      role: 'CTO',
      rating: 4,
      birthDate: '1983-04-12'
  },
  {
    name: 'Rupert',
    role: 'Business Intelligence',
    rating: 2,
    birthDate: '1970-04-12'
  },
  {
    name: 'Clemens',
    role: 'Developer',
    rating: 3,
    birthDate: '1978-11-01'
  },
  {
    name: 'Sarah',
    role: 'Support',
    rating: 2,
    birthDate: '1982-02-21'
  }
];
