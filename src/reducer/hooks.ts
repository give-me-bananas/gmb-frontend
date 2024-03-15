import { useContext } from "react";
import { GlobalStateContext } from "./store";

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return { state: context[0], dispatch: context[1] };
};
