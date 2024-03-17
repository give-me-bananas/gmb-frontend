export type GlobalState = {
  isAuth: boolean;
  smartAccount: unknown;
};

export type AppAction =
  | { type: "setAuth" }
  | { type: "setUnauth" }
  | {
      type: "setSmartAccount";
      smartAccount: unknown;
    }
  | {
      type: "unsetSmartAccount";
    };

export const GlobalReducer = (state: GlobalState, action: AppAction) => {
  const { type } = action;
  switch (type) {
    case "setAuth":
      return {
        ...state,
        isAuth: true,
      };
    case "setUnauth":
      return {
        ...state,
        isAuth: false,
      };
    case "setSmartAccount":
      return {
        ...state,
        smartAccount: action.smartAccount,
      };
    case "unsetSmartAccount":
      return {
        ...state,
        smartAccount: undefined,
      };
    default:
      return state;
  }
};
