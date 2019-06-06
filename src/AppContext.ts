import { createContext } from 'react';

export const DEFAULT_INVITATION_COUNT = 10;
export const DEFAULT_CALCULATIONS_COST = 15;

export interface AppContextValue {
  pure: boolean;
  memo: boolean;
  invitationsCount: number;
  calculationsCost: number;
  times: number[];
}

export interface AppContextProps {
  value: AppContextValue;
  onInvitationsCountChange(length: string): void;
  onCalculationsCostChange(cost: string): void;
  togglePure(): void;
  toggleMemo(): void;
}

const AppContext = createContext<AppContextProps>({
  value: {
    pure: false,
    memo: false,
    invitationsCount: DEFAULT_INVITATION_COUNT,
    calculationsCost: DEFAULT_CALCULATIONS_COST,
    times: [],
  },
  onCalculationsCostChange: Function,
  onInvitationsCountChange: Function,
  togglePure: Function,
  toggleMemo: Function,
});

export default AppContext;
