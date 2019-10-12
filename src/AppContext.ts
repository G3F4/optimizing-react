import { createContext } from 'react';

export const DEFAULT_INVITATION_COUNT = 10;
export const DEFAULT_CALCULATIONS_COST = 15;

export interface AppContextValue {
  pure: boolean;
  memo: boolean;
  invitationsCount: number;
  calculationsCost: number;
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
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCalculationsCostChange(_cost: string) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onInvitationsCountChange(_length: string) {
    return;
  },
  togglePure: Function,
  toggleMemo: Function,
});

export default AppContext;
