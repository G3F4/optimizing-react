import { createContext } from 'react';

export const DEFAULT_INVITATION_COUNT = 10;
export const DEFAULT_CALCULATIONS_COST = 15;

export interface AppContextValue {
  disableRipple: boolean;
  memo: boolean;
  pure: boolean;
  invitationsCount: number;
  calculationsCost: number;
}

export interface AppContextProps {
  value: AppContextValue;
  onInvitationsCountChange(length: string): void;
  onCalculationsCostChange(cost: string): void;
  toggleDisableRipple(): void;
  toggleMemo(): void;
  togglePure(): void;
}

const AppContext = createContext<AppContextProps>({
  value: {
    disableRipple: false,
    pure: false,
    memo: false,
    invitationsCount: DEFAULT_INVITATION_COUNT,
    calculationsCost: DEFAULT_CALCULATIONS_COST,
  },
  onCalculationsCostChange: Function,
  onInvitationsCountChange: Function,
  toggleDisableRipple: Function,
  toggleMemo: Function,
  togglePure: Function,
});

export default AppContext;
