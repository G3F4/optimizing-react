import React, { FC, useCallback, useState } from 'react';
import tinyParams from 'tiny-params';
import AppContext, {
  AppContextValue,
  DEFAULT_CALCULATIONS_COST,
  DEFAULT_INVITATION_COUNT,
} from '../AppContext';
import Layout from './layout/Layout';

const App: FC = () => {
  const [context, setContext] = useState<AppContextValue>({
    memo: tinyParams(window.location.href).memo || false,
    pure: tinyParams(window.location.href).pure || false,
    calculationsCost: DEFAULT_CALCULATIONS_COST,
    invitationsCount: DEFAULT_INVITATION_COUNT,
  });

  const toggleMemo = useCallback(() => {
    setContext({
      ...context,
      memo: !context.memo,
    });
  }, [context, setContext]);

  const togglePure = useCallback(() => {
    setContext({
      ...context,
      pure: !context.pure,
    });
  }, [context, setContext]);

  const handleInvitationsCountChange = useCallback(
    (length: string) => {
      setContext({
        ...context,
        invitationsCount: parseInt(length, 10),
      });
    },
    [context, setContext],
  );

  const handleCalculationsCostChange = useCallback(
    (calculationsCost: number) => {
      setContext({
        ...context,
        calculationsCost,
      });
    },
    [context, setContext],
  );

  return (
    <AppContext.Provider
      value={{
        value: context,
        toggleMemo: toggleMemo,
        togglePure: togglePure,
        onInvitationsCountChange: handleInvitationsCountChange,
        onCalculationsCostChange: handleCalculationsCostChange,
      }}
    >
      <Layout />
    </AppContext.Provider>
  );
};

export default App;
