import { PropsWithChildren, createContext, useReducer } from "react";
import { AppAction, GlobalReducer, GlobalState } from "./reducer";

const initialGlobalState = { isAuth: false, smartAccount: undefined };

export const GlobalStateContext = createContext([
  initialGlobalState,
  () => {},
] as [GlobalState, React.Dispatch<AppAction>]);

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};
