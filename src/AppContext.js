import { createContext } from 'react';

const AppContext = createContext({
  value: {
    pure: false,
    memo: false,
  },
  pureToggle: () => {},
  memoToggle: () => {},
});

export default AppContext;
