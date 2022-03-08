import { createContext } from 'react';

export const UserContext = createContext({
  username: '',
  setUsername: (username: string) => {},
});
